module BlockEditor
  class Engine < ::Rails::Engine
    isolate_namespace BlockEditor

    initializer "webpacker.proxy" do |app|
      insert_middleware = begin
                            BlockEditor.webpacker.config.dev_server.present?
                          rescue
                            nil
                          end
      next unless insert_middleware

      app.middleware.insert_before(
        0, Webpacker::DevServerProxy,
        ssl_verify_none: true,
        webpacker: BlockEditor.webpacker
      )
    end

    # Initializer to combine this engines static assets with the static assets of the host application
    initializer 'static assets' do |app|
      app.middleware.insert_before(::ActionDispatch::Static, ::ActionDispatch::Static, "#{root}/public")
    end

    initializer 'block_editor.assets.precompile' do |app|
      assets_for_precompile = [
        'block_editor/frontend.css',
        'block_editor/backend.css'
      ]

      app.config.assets.precompile.concat assets_for_precompile
    end
  end
end
