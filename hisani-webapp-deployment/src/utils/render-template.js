const Mustache = require('mustache');

function render_template(template_string, data, partial) {
    const output = Mustache.render(template_string, data, partial)
    return output
}

export { render_template }