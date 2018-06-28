const $ = require('jquery')

const {
  wrap_in_shadow
} = require('libs_frontend/frontend_libs')

require_component('habitlab-logo-v2')
require_component('call-to-action-button')

//Polymer button
require_component('paper-button')

var intervalID = window.setInterval(removeComments, 200);

//Removes comments
function removeComments() {
  for (let item of $('.commentable_item')) {
    if (!$(item).prop('button_inserted')) {
      $(item).css('display','none')
      $(item).prop('button_inserted', true)

      var show_comments_button = $('<paper-button style="background-color: #415D67; color: white; width: 152 px; height: 38px; -webkit-font-smoothing: antialiased; box-shadow: 2px 2px 2px #888888; font-size: 12px; margin-left: 5px; margin-right: 5px; margin-top: 10px; margin-bottom: 10px">Show Comments</paper-button>')
      show_comments_button.click(function() {
          $(item).siblings('.habitlab_button_container').remove()
          $(item).css('display','block')
      })
      var habitlab_logo = $('<habitlab-logo-v2 style="margin-left: 5px; font-size: 12px; margin-left: 5px; margin-right: 5px; margin-top: 10px; margin-bottom: 10px"></habitlab-logo-v2>')
      var close_tab_button = $('<call-to-action-button style="height: 38px; font-size: 12px; margin-left: 5px; margin-right: 5px; margin-top: 10px; margin-bottom: 10px"</call-to-action-button>')
      var button_container = $('<div style="text-align: center; display: flex; justify-content: center;"></div>')
      button_container.append([
        show_comments_button,
        close_tab_button,
        habitlab_logo
      ])
      var button_container_wrapper = $(wrap_in_shadow(button_container)).addClass('habitlab_button_container')
      $(item).parent().append(button_container_wrapper)
    }
  }
}

// showComments
function showComments() {
  clearInterval(intervalID);
  for (let item of $('.commentable_item')) {
    if ($(item).prop('button_inserted')) {
      $(item).css('display','block')
      $(this).siblings('.habitlab_button_container').remove()
    }
  }
}

window.on_intervention_disabled = () => {
  $('.habitlab_button_container').remove()
  showComments();
}
