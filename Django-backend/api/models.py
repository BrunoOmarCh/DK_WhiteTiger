from django.db import models

# Create your models here.
from django.db import models

class Cliente(models.Model):
    cliente_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    region = models.CharField(max_length=50)

class Producto(models.Model):
    producto_id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    registro = models.CharField(max_length=50)
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)

class Ubicacion(models.Model):
    ubicacion_id = models.AutoField(primary_key=True)
    referencia = models.CharField(max_length=100)
    latitud = models.DecimalField(max_digits=9, decimal_places=6)
    longitud = models.DecimalField(max_digits=9, decimal_places=6)

class Pedido(models.Model):
    pedido_id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    registro = models.CharField(max_length=50)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)
    peso_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20)

class Linea(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField()

    class Meta:
        unique_together = ('pedido', 'producto')

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100)
    region = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=100)
    rol = models.CharField(max_length=50)
    tipo_documento = models.CharField(max_length=50)
    documento = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=15)

class Vehiculo(models.Model):
    placa = models.CharField(max_length=10, primary_key=True)
    soat = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    color = models.CharField(max_length=30)
    registro = models.CharField(max_length=50)
    año_fabricacion = models.IntegerField()
    capacidad = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20)

class Conductor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    breve = models.CharField(max_length=20)
    estado = models.CharField(max_length=20)

class Recorrido(models.Model):
    recorrido_id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    hora_salida = models.TimeField()
    fecha = models.DateField()
    hora_entrada = models.TimeField()
    estado = models.CharField(max_length=20)

class Envio(models.Model):
    envio_id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    registro = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    recorrido = models.ForeignKey(Recorrido, on_delete=models.CASCADE)
    hora_llegada = models.TimeField()
    anticipado = models.BooleanField()