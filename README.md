# Block Editor for Ruby on Rails
This editor uses packages from the [Wordpress Gutenberg project](https://github.com/WordPress/gutenberg) to build a standalone block editor for Rails. This editor has been extracted from [Integral CMS](https://github.com/yamasolutions/integral) where it was built following the [Wordpress custom block editor tutorial](https://developer.wordpress.org/block-editor/how-to-guides/platform/custom-block-editor/).

The editor currently uses the v9.2.1 Gutenberg release packages which were part of the Wordpress v5.6 release.

Looking for a demo? Checkout this [simple host application example.](https://block-editor-rails.herokuapp.com/)

More information;

* [Simple host application example source repository](https://github.com/yamasolutions/block-editor-sample)
* [Current Wordpress Editor Demo](https://wordpress.org/gutenberg/)
* [Gutenberg Block Editor Developer Documentation](https://developer.wordpress.org/block-editor/)

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'block_editor'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install block_editor
```

## Usage

* Grab the required migrations and migrate;
```
rails block_editor:install:migrations
rails db:migrate
```
* Add `include BlockEditor::Listable` to any model you wish to associate the block editor with, i.e.

```
class Post < ApplicationRecord
  include BlockEditor::Listable
end
```
* Add the block editor to your model form;
```
  <%= form.fields_for :active_block_list do |block_list| %>
    <%= BlockEditor::Instance.render(block_list) %>
  <% end %>
```
* Add the block editor Javascript and styles within your `HEAD` tag
```
  <%= javascript_pack_tag 'block_editor/application', 'data-turbolinks-track': 'reload', webpacker: 'BlockEditor' %>
  <%= stylesheet_pack_tag 'block_editor/application', 'data-turbolinks-track': 'reload', webpacker: 'BlockEditor' %>
```
* Boom! You have a Block Editor linked to your model

Note: If the error `Webpacker::Manifest::MissingEntryError` appears you need to run the following command to precompile the BlockEditor assets;
```
rails block_editor:webpacker:compile
```

### Strong Parameters
Remember to permit the block list attributes if you're using Strong Parameters (you should be), i.e;
```
  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, active_block_list_attributes: [ :id, :content ])
  end
```

Note: You may also need to specifically set the listable attribute within your controller before saving, i.e. -
```
@post.active_block_list.listable = @post
```

### Styling

BlockEditor has a soft dependency on Bootstrap. You will need to add this to your application in order for the default styles to be compiled. If you do not want to use the default styles do not include them in the your application stylesheet and override BlockEditor's backend stylesheet (`block_editor/frontend.scss`) with whatever custom styles you want to include.

#### Frontend
Include the default styles into your application stylesheet;
```
  @import "block_editor/blocks/frontend";
  @import "block_editor/utilities";
```

### Backend
Add the backend stylesheet where you are rendering the block editor, for example admin dashboard;
```
<%= stylesheet_link_tag 'block_editor/backend', media: 'all', 'data-turbolinks-track': 'reload' %>
```

### Overriding and/or adding custom styles
The below files are provided by BlockEditor as entry points. Override them if you want to provide custom styling to your blocks;
* `app/assets/stylesheets/block_editor/host_app/blocks/_frontend.scss` - Any styles that should be displayed within the frontend and backend
* `app/assets/stylesheets/block_editor/host_app/blocks/_backend.scss` - Any styles that should _only_ be displayed within the block editor itself, i.e when creating or editing the blocks

### Media Uploader & Images
There is no built in MediaUploader or media gallery, it is up to the host application to implement this.

When the media uploader is requested the Block Editor checks if `window.BlockEditorMediaUploader` is defined. If it is defined the block editor will call `window.BlockEditorMediaUploader.open(callback)`, otherwise it will randomly select an image from [Unsplash](https://unsplash.com)

When an image is successfully uploaded or selected the BlockEditorMediaUploader instance should call the callback which was passed into the `open` function;
```
callback({url: imageUrl})
```

### Turbolinks
Currently Block Editor is not compatible with Turbolinks as history is only being reset on full page loads. To disable Turbolinks per page add the following in your layout view file within your `<HEAD>`;;
```
<meta name="turbolinks-visit-control" content="reload">
```

### Reusable Blocks

BlockEditor will check the following endpoints for any available reusable blocks, if any are found they will appear in the inserter menus
```
    get '/wp/v2/types', to: 'backend/block_lists#wp_types'
    get '/wp/v2/types/wp_block', to: 'backend/block_lists#wp_type'
    get '/wp/v2/block_lists', to: 'backend/block_lists#block_lists'
    get '/wp/v2/block_list/:id', to: 'backend/block_lists#show'
    get '/wp/v2/blocks/:id', to: 'backend/block_lists#show'
```

For an example of what the BlockEditor is expecting from these endpoints checkout how [Integral CMS has implemented this](https://github.com/yamasolutions/integral/blob/master/app/controllers/integral/backend/block_lists_controller.rb)

### Adding/Removing blocks
*Currently there isn't a way of adding or removing blocks without forking the gem.*

* Fork the gem
* Edit `app/javascript/block_editor/blocks/index.js` where all blocks are registered


### Dynamic blocks
Dynamic blocks are useful for non-static content such as a recent posts block or more complex blocks like a contact form block.

*Currently the gem needs to be forked in order to create a dynamic block*

A dynamic block is made up of 4 components;
* Ruby class to handle frontend rendering
* Partial to be rendered on the frontend
* Frontend and backend styling
* JS file to manage how the block behaves within the block editor itself (This part currently is not possible without forking the gem) [Read More](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type)

1. Create block class which can be as simple as;
```
class RecentPosts < BlockEditor::Base
  def self.name
    'block-editor/recent-posts'
  end
end
```
2. Add block class to ```BlockEditor.dynamic_blocks``` config;
```
// application.rb

BlockEditor.dynamic_blocks = [RecentPosts]
```
3. Create the view partial you want to be rendered as the block;
```
// app/views/block_editor/blocks/block-editor/recent-posts/_block.html.erb

My Recent Posts
<%= @posts %>
```
4. Add any required styling to the frontend and backend stylesheets;

```
app/assets/stylesheets/block_editor/host_app/blocks/_frontend.scss
```

```
app/assets/stylesheets/block_editor/host_app/blocks/_backend.scss
```
5. Add the block to the block editor
* Fork the gem
* Create the block JS file i.e. `app/javascript/block_editor/blocks/contact_form/index.js`
* Edit `app/javascript/block_editor/blocks/index.js` to register the block

## Contributing
Contribution are very welcome! Currently the biggest issue that needs to be solved is extensibility. There is no way to modify and configure the editor behaviour (such as blocks to display, block output etc) without forking the engine.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
