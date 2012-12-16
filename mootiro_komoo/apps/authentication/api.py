# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import logging

from django.core.urlresolvers import reverse
from django.utils.translation import ugettext as _


from main.utils import (ResourceHandler, JsonResponse, JsonResponseNotFound,
        get_json_data, get_fields_to_show)

from .models import User, Login
from .utils import login as auth_login
from .utils import logout as auth_logout


logger = logging.getLogger(__name__)


class UserHandler(ResourceHandler):
    """ /user """

    def post(self, request):
        """
        Handles the RegisterForm from LoginView (authentication/views.coffee)
        Responsible for creating a new User account.
        """
        json_data = get_json_data(request)
        json_data['email'] = json_data.get('email', '').lower()
        user = User()
        user.from_dict(json_data)

        # user model validations
        form_validates = user.is_valid()

        # form specific validations
        if not json_data.get('password_confirm', None):
            form_validates = False
            user.errors['password_confirm'] = _('Required field')

        license = json_data.get('license', '')
        license = True if license == 'agree' else False
        if not license:
            form_validates = False
            user.errors['license'] = _(''
                'You must accept the license agrement')
        if not json_data.get('password') == json_data.get('password_confirm'):
            form_validates = False
            user.errors['password_confirm'] = _(''
                    'Passwords did not match')

        # return errors or save
        if not form_validates:
            return JsonResponse({'errors': user.errors}, status_code=400)
        else:
            user.is_active = False
            user.set_password(json_data.get('password'))
            user.save()
            user.send_confirmation_mail(request)
            return JsonResponse()


class UsersHandler(ResourceHandler):
    """ /users/[id_]/<action> """

    def get(self, request, id_, action):
        fields = get_fields_to_show(request,
                ['id', 'name', 'email', 'contact', 'url', 'is_admin'])
        user = request.user if id_ == 'me' else User.get_by_id(id_)

        if not user:
            return JsonResponseNotFound()

        # /user/[id_]
        if not action:
            return JsonResponse(user.to_cleaned_dict(fields=fields,
                                                     user=request.user))

        # /user/[id]/geojson
        if action == 'geojson':
            return JsonResponse(user.geojson)


class LoginHandler(ResourceHandler):
    """ /user/login """

    def post(self, request):
        """
        Resposible for handle the LoginForm from LoginView
        (authentication/views.coffee)
        """
        print 'REQ', request.raw_post_data
        json_data = get_json_data(request)
        email, password = [json_data.get(data, '')
                            for data in ['email', 'password']]
        email = email.lower()
        print 'DATa:', email, password

        login = Login()
        login.from_dict({'email': email, 'password': password})
        if not login.is_valid():
            return JsonResponse({'errors': login.errors}, status_code=400)
        else:
            user = login.user
            auth_login(request, user)
            next_page = json_data.get('next', '') or reverse('root')
            if next_page.endswith('#'):
                next_page = next_page[:-1]
            return JsonResponse({'redirect': next_page})


class LogoutHandler(ResourceHandler):
    """ /user/logout """

    def get(self, request):
        next_page = request.GET.get('next', '') or reverse('root')
        if next_page.endswith('#'):
            next_page = next_page[:-1]
        auth_logout(request)
        print {'redirect': next_page}
        return JsonResponse({'redirect': next_page})
