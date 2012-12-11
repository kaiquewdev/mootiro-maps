define (require) ->

  $ = require 'jquery'
  _ = require 'underscore'
  Backbone = require 'backbone'
  modal_box = require 'text!templates/widgets/_modal_box.html'

  loadCss = (url) ->
    if not $("link[href=\"#{url}\"]").length
      console?.log?('Loading css: ', url)
      link = document.createElement("link")
      link.type = "text/css"
      link.rel = "stylesheet"
      link.href = url
      document.getElementsByTagName("head")[0].appendChild(link)


  class ModalBox extends Backbone.View
    template: _.template modal_box

    events: {
      'click .close': 'close'
      'click .modal-bg': 'close'
    }

    initialize: ->
      _.bindAll this
      @tpl_args = _.extend {tile: '', modal_id: 'modal-box'}, @options
      @content = @options.content ? ''
      if @options.width
        @width = @options.width
      @render()

    render: ->
      renderedContent = @template @tpl_args
      @$el.html renderedContent

      $('body').append @el
      @$el.find('.content').append @content

      @modal = @$el.find "##{@tpl_args.modal_id}"

      if @width?
        @modal.find('.dialog').css('width', @width)
      this

    open: ->
      @modal.fadeIn()
      @trigger 'open'
      this

    close: ->
      @modal.fadeOut()
      @trigger 'close'
      this


  return {
    loadCss: loadCss
    ModalBox: ModalBox
  }