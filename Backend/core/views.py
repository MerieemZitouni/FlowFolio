
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .models import *

class UserRegister(APIView):
	#access by anyone 
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

#access by anyone 
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user) 
			print(serializer.data)
			token, created = Token.objects.get_or_create(user=user)
			return Response({'token': token.key, 'user_id': user.user_id}, status=status.HTTP_200_OK)



class UserLogout(APIView):
	
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Simply delete the token from the client-side
        request.auth.delete()
        return Response({'message': 'Successfully logged out'})

class UserView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        # You can customize the data you want to return here
        user_data = {
            'id': user.user_id,
            'username': user.username,
            'role': user.role,
            # Add more fields as needed
        }
        return Response(user_data)
class AddProjet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        print(data)
        nom = data.get('nom', '')
        code_projet = data.get('codeProjet', '')

        # Create a new Projet instance with the extracted data
        projet = Projet.objects.create(nom=nom, code=code_projet)
        # ...

# Extract the 'champsCodification' data
        champs_codification = data.get('champsCodification', [])

        # Loop through the 'champsCodification' data and create ChampCodification instances
        for champ_data in champs_codification:
            titre = champ_data.get('titre', '')
            nb_caracteres = champ_data.get('nbCaracteres', 0)
            type_champ = champ_data.get('typeChamp', '')

            # Create a new ChampCodification instance for each item
            ChampCodification.objects.create(
                projet=projet,
                nom_champ=titre,
                taille_champ=nb_caracteres,
                type_champ=type_champ
            )

        # You can return a success response or any other response you need
        return Response({"message": "Projet added successfully"}, status=status.HTTP_201_CREATED)
    
class projets(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        queryset = Projet.objects.all()
        serializer = ProjetSerializer(queryset, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Pass the serialized data to the Response object

class document_prjt(APIView,):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request,project_id):
        queryset = Document.objects.filter(projet=project_id)
        serializer = DocumentSerializer(queryset, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Pass the serialized data to the Response object

class AddDocument(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        print(data)
       
        return Response({"message": "Document added successfully"}, status=status.HTTP_201_CREATED)