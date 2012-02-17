#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # unicode by default

from django import forms

from main.fields import TagsField
from main.widgets import JQueryAutoComplete, Tagsinput, ImageSwitchMultiple
from need.models import Need, NeedCategory
from community.models import Community


class NeedForm(forms.ModelForm):
    class Meta:
        model = Need

    community = forms.CharField(widget=forms.HiddenInput())
    # FIXME: the urls below should not be hardcoded. They should be calculated
    # with reverse_lazy function, which is not implemented in Django 1.3 yet.
    community_name = forms.CharField(widget=JQueryAutoComplete(
        "/community/search_by_name", value_field='community'))
    
    categories = forms.ModelMultipleChoiceField(
                    queryset=NeedCategory.objects.all(),
                    widget=ImageSwitchMultiple)

    tags = TagsField(widget=Tagsinput(autocomplete_url="/need/tag_search"))

    def __init__(self, *a, **kw):
        super(NeedForm, self).__init__(*a, **kw)
        if 'instance' in kw and kw['instance']:  # self.is_bound does not work properly
            self.fields.pop('community_name')


    def clean_community(self):
        return Community.objects.get(id=self.cleaned_data['community'])
