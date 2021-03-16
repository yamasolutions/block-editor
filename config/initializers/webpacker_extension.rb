module Webpacker::DynamicTag
  def javascript_pack_tag(*names, **options)
    return super unless options[:webpacker]
    new_helper = self.dup
    new_helper.define_singleton_method(:current_webpacker_instance) do
      options[:webpacker].constantize.webpacker
    end
    new_helper.javascript_pack_tag(*names, **options.except(:webpacker))
  end
end

Webpacker::Helper.prepend Webpacker::DynamicTag
