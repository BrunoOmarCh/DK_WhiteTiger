from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Registrar todas las rutas para cada ViewSet
router.register(r'clientes', views.ClienteViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'ubicaciones', views.UbicacionViewSet)
router.register(r'pedidos', views.PedidoViewSet)
router.register(r'lineas', views.LineaViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'vehiculos', views.VehiculoViewSet)
router.register(r'conductores', views.ConductorViewSet)
router.register(r'recorridos', views.RecorridoViewSet)
router.register(r'envios', views.EnvioViewSet)

# Incluir las rutas registradas en urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]