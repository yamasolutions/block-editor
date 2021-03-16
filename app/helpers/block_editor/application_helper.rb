require "webpacker/helper"

module BlockEditor
  module ApplicationHelper
    include ::Webpacker::Helper

    def current_webpacker_instance
      BlockEditor.webpacker
    end
  end
end
