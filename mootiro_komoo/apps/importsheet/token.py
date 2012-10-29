# -*- coding: utf-8 -*-
'''
These views exists as a easy way to get a refresh code for a given google 
account. Once you get the refresh code store it securely!
'''
from __future__ import unicode_literals
import requests
import simplejson
import httplib2

from django.conf import settings
from django.shortcuts import redirect
from django.core.urlresolvers import reverse

# Google API
from apiclient.discovery import build
from oauth2client.client import AccessTokenCredentials

from annoying.decorators import render_to
from authentication.utils import encode_querystring


def refresh_token(request):
    '''Getting authorization from the user'''
    redirect_uri = request.build_absolute_uri(
                        reverse('importsheet_refresh_token_authorized'))
    params = {
        'client_id': settings.GOOGLE_APP_ID,
        'redirect_uri': redirect_uri,
        # below a space separated list of permissions
        'scope': 'https://www.googleapis.com/auth/drive '
                 'https://www.googleapis.com/auth/drive.file',
        'access_type': 'offline',
        'response_type': 'code',
        'approval_prompt': 'force',
    }
    url = 'https://accounts.google.com/o/oauth2/auth'
    url += '?' + encode_querystring(params)
    return redirect(url)


@render_to('importsheet/refresh_token.html')
def refresh_token_authorized(request):
    '''Exchange the authorization code for an refresh token and displays it.'''
    error = request.GET.get('error', None)
    if error:
        error_description = request.GET.get('error_description', None)
        return dict(error=error_description)

    redirect_uri = request.build_absolute_uri(
                        reverse('importsheet_refresh_token_authorized'))
    params = {
        'client_id': settings.GOOGLE_APP_ID,
        'client_secret': settings.GOOGLE_APP_SECRET,
        'code': request.GET.get('code'),
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
    }
    url = 'https://accounts.google.com/o/oauth2/token'
    resp = requests.post(url, data=params)
    access_data = simplejson.loads(resp.text)
    refresh_token = access_data['refresh_token']

    return dict(refresh_token=access_data)


REFRESH_TOKEN = '1/jb0f_r6DC7sodr8te4chKfVIHZQWaI5ZHl26eHfIhss'

def get_access_token():
    # TODO: only refresh the token if expired
    params = {
        'client_id': settings.GOOGLE_APP_ID,
        'client_secret': settings.GOOGLE_APP_SECRET,
        'refresh_token': REFRESH_TOKEN,
        'grant_type': 'refresh_token',
    }
    url = 'https://accounts.google.com/o/oauth2/token'
    resp = requests.post(url, data=params)
    data = simplejson.loads(resp.text)
    access_token = data['access_token']
    return access_token


def authorized_http(request):
    access_token = get_access_token()
    user_agent = request.META['HTTP_USER_AGENT']
    credentials = AccessTokenCredentials(access_token, user_agent)
    http = httplib2.Http()
    http = credentials.authorize(http)
    return http


def google_drive_service(request):
    '''Build and return a google drive service to interact with.'''
    http = authorized_http(request)
    service = build('drive', 'v2', http)
    return service


def google_spreadsheets_service(request):
    '''Build and return a google spreadsheets service to interact with.'''
    http = authorized_http(request)
    service = build('spreadsheets', 'v3', http)
    return service