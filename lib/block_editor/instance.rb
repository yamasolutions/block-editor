module BlockEditor
  class Instance
    include ActionView::Helpers::TagHelper
    include ActionView::Helpers::FormTagHelper

    attr_accessor :output_buffer

    def self.render(form_builder)
      self.new.render(form_builder)
    end

    def render(form_builder)
      content_tag(:div, data: { controller: 'block-editor' }) do
        form_builder.hidden_field(:content, data: { 'block-editor-target' => 'input' }) +
          content_tag('div', nil, { class: 'block-editor', data: { 'block-editor-target' => 'output' } })
      end
    end
  end
end
