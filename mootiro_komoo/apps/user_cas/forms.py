# -*- coding: utf-8 -*-

from django import forms
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from ajaxforms import AjaxModelForm
from markitup.widgets import MarkItUpWidget
from main.utils import MooHelper
from .models import KomooProfile


class FormProfile(AjaxModelForm):
    contact = forms.CharField(required=False, widget=MarkItUpWidget())
    public_name = forms.CharField(required=False)
    # geometry = forms.CharField(required=False, widget=forms.HiddenInput())

    class Meta:
        model = KomooProfile
        fields = ['public_name', 'contact', 'id']

    _field_labels = {
        'public_name': _('Full Name'),
        'contact': _('Public Contact')
    }

    def __init__(self, *a, **kw):
        self.helper = MooHelper(form_id='form-profile')
        self.helper.form_action = reverse('profile_update_public_settings')
        r = super(FormProfile, self).__init__(*a, **kw)
        inst = kw.get('instance', None)
        if inst and not inst.public_name:
            self.fields['public_name'].initial = inst.user.get_full_name() or \
                                                 inst.user.username
