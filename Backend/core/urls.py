from django.urls import path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('addprojet',views.AddProjet.as_view(),name='addprojet'),
    path('addDocument',views.AddDocument.as_view(),name='adddocument'),
    path('projet',views.projets.as_view(),name='projet'),
    path('api/documents/<int:project_id>/',views.document_prjt.as_view(),name='documents'),
]
