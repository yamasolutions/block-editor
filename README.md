# Block Editor for Ruby on Rails
This editor uses packages from the [Wordpress Gutenberg project](https://github.com/WordPress/gutenberg) to build a standalone block editor for Rails. This editor has been extracted from [Integral CMS](https://github.com/yamasolutions/integral) where it was built following the [Wordpress custom block editor tutorial](https://developer.wordpress.org/block-editor/how-to-guides/platform/custom-block-editor/).

More information;

* [Gutenberg Demo](https://wordpress.org/gutenberg/)
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

### Strong Parameters
Remember to permit the block list attributes if you're using Strong Parameters (you should be), i.e;
```
  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, active_block_list_attributes: [ :id, :content ])
  end
```

### Styling

Add the frontend stylesheet where you are displaying the user created block lists;
```
<%= stylesheet_link_tag 'block_editor/backend', media: 'all', 'data-turbolinks-track': 'reload' %>
```

Add the backend stylesheet where you are rendering the block editor, for example admin dashboard;
```
<%= stylesheet_link_tag 'block_editor/backend', media: 'all', 'data-turbolinks-track': 'reload' %>
```

The below files should be overridden within your application in order to style your blocks;
* `app/assets/stylesheets/block_editor/frontend/blocks.scss` - Any styles that should be displayed within the frontend and backend
* `app/assets/stylesheets/block_editor/backend/blocks.scss` - Any styles that should _only_ be displayed within the block editor itself, i.e when creating or editing the blocks


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
class ContactForm < BlockEditor::Base
  def self.name
    'block-editor/contact-form'
  end
end
```
2. Add block class to ```BlockEditor.dynamic_blocks``` config;
```
// application.rb

BlockEditor.dynamic_blocks = [ContactForm]
```
3. Create the view partial you want to be rendered as the block;
```
// app/views/block_editor/blocks/block-editor/contact-form/_block.html.erb

My Recent Posts
<%= @posts %>
```
4. Add any required styling to the frontend and backend stylesheets;

```
app/assets/stylesheets/block_editor/backend/blocks.scss
```

```
app/assets/stylesheets/block_editor/frontend/blocks.scss
```
5. Add the block to the block editor
* Fork the gem
* Create the block JS file i.e. `app/javascript/block_editor/blocks/contact_form/index.js`
* Edit `app/javascript/block_editor/blocks/index.js` to register the block

## Contributing
Contribution are very welcome! Currently the biggest issue that needs to be solved is extensibility. There is no way to modify and configure the editor behaviour (such as blocks to display, block output etc) without forking the engine.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
