require "block_editor/version"
require "block_editor/engine"

require "block_editor/instance"
require 'block_editor/blocks/base'
require 'block_editor/blocks/contact_form'
require 'block_editor/blocks/recent_posts'
require 'block_editor/block_list_renderer'

module BlockEditor
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
        root_path: ROOT_PATH,
        config_path: ROOT_PATH.join("config/webpacker.yml")
      )
    end
  end

  mattr_accessor :dynamic_blocks
  @@dynamic_blocks = ['BlockEditor::Blocks::ContactForm', 'BlockEditor::Blocks::RecentPosts']

  mattr_accessor :frontend_parent_controller
  @@frontend_parent_controller = 'ApplicationController'
end

