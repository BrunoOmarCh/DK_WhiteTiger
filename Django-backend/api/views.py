from rest_framework import viewsets
from .models import (
    Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio,
    Estado, RolUsuario, TipoDocumento, DocumentoUsuario, Marca, Modelo, Color
)
from .serializers import (
    ClienteSerializer, ProductoSerializer, UbicacionSerializer, PedidoSerializer, LineaSerializer,
    UsuarioSerializer, VehiculoSerializer, ConductorSerializer, RecorridoSerializer, EnvioSerializer,
    EstadoSerializer, RolUsuarioSerializer, TipoDocumentoSerializer, DocumentoUsuarioSerializer,
    MarcaSerializer, ModeloSerializer, ColorSerializer
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mysql.connector import connect, Error
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Util.Padding import unpad
from Crypto.Hash import SHA256
import base64
import hmac
import os
import bcrypt
import json
from .models import Usuario
from django.db.utils import IntegrityError

SECRET_KEY = os.getenv('SECRET_KEY', 'elSyDaMeConsume')

def generate_salt_and_key():
    salt = os.urandom(16)
    key = PBKDF2(SECRET_KEY, salt, dkLen=32, count=1000)
    return key, salt

def decrypt_data(encrypted_data):
    try:
        ciphertext_base64 = encrypted_data['ciphertext']
        ciphertext = base64.b64decode(ciphertext_base64)
        salt = bytes.fromhex(encrypted_data['salt'])
        iv = bytes.fromhex(encrypted_data['iv'])
        hmac_provided = encrypted_data['hmac']

        key = PBKDF2(SECRET_KEY.encode('utf-8'), salt, dkLen=32, count=1000, hmac_hash_module=SHA256)

        hmac_calculated = hmac.new(key, ciphertext_base64.encode(), SHA256).hexdigest()
        print("Salt (hex):", salt.hex())
        print("IV (hex):", iv.hex())
        print("Ciphertext (Base64):", ciphertext_base64)
        print("HMAC calculado:", hmac_calculated)
        print("HMAC proporcionado:", hmac_provided)
        
        if hmac_calculated != hmac_provided:
            raise ValueError("HMAC no coincide. Los datos pueden estar comprometidos.")

        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted = unpad(cipher.decrypt(ciphertext), AES.block_size)

        return json.loads(decrypted.decode('utf-8'))

    except Exception as e:
        raise ValueError("Error en el descifrado de los datos")

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        # Obtener los datos enviados por el frontend
        name = data.get('name')
        email = data.get('email')

        # Descifrar y hashear la contraseña
        decrypted_data = decrypt_data(data['password'])
        password = decrypted_data['password'].encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        # Verificar si el usuario ya existe
        if Usuario.objects.filter(contacto=email).exists():
            return Response({"message": "Usuario ya registrado"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear un nuevo usuario con valores predeterminados en los campos adicionales
        usuario = Usuario(
            nombre=name,
            contacto=email,
            contraseña=hashed_password.decode('utf-8'),
        )
        usuario.save()

        return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"message": f"Error al registrar el usuario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login(request):
    data = request.data
    try:
        # Obtener el email y descifrar la contraseña
        email = data.get('email')
        decrypted_data = decrypt_data(data['password'])
        password = decrypted_data['password'].encode('utf-8')

        # Verificar si el usuario existe y si la contraseña es correcta
        usuario = Usuario.objects.filter(contacto=email).first()
        if usuario and bcrypt.checkpw(password, usuario.contraseña.encode('utf-8')):
            return Response({
                "message": "Inicio de sesión exitoso",
                "user": {
                    "rol": usuario.rol,
                    "nombre": usuario.nombre,
                    "contacto": usuario.contacto,
                    "id": usuario.usuario_id
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({"message": f"Error en el proceso de inicio de sesión: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    
@api_view(['GET'])
def generate_key_endpoint(request):
    """Endpoint para enviar el salt al frontend."""
    _, salt = generate_salt_and_key()
    return Response({'salt': salt.hex()}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_conductor(request):
    serializer = ConductorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def create_vehiculo(request):
    serializer = VehiculoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class RolUsuarioViewSet(viewsets.ModelViewSet):
    queryset = RolUsuario.objects.all()
    serializer_class = RolUsuarioSerializer

class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer

class DocumentoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DocumentoUsuario.objects.all()
    serializer_class = DocumentoUsuarioSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class ModeloViewSet(viewsets.ModelViewSet):
    queryset = Modelo.objects.all()
    serializer_class = ModeloSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class LineaViewSet(viewsets.ModelViewSet):
    queryset = Linea.objects.all()
    serializer_class = LineaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer

class RecorridoViewSet(viewsets.ModelViewSet):
    queryset = Recorrido.objects.all()
    serializer_class = RecorridoSerializer

class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
