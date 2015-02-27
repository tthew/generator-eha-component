var generators = require('yeoman-generator');
module.exports = generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'componentNamespace',
        message: 'Please enter component\'s namespace',
        default: 'eha'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Please enter a name for this component (e.g. angular-eha.component-name)'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please enter the author\'s name'
      }
    ];

    this.prompt(prompts, function(props) {
      this.componentName = props.name;
      this.componentNamespace = props.componentNamespace;
      this.name = 'angular-' + props.componentNamespace + '.' + props.name;
      this.author = props.author;
      done();
    }.bind(this));
  },

  scaffoldFolders: function() {
    this.mkdir('src');
    this.mkdir('test');
  },
  copyTemplates: function() {
    var name = this.name;
    var date = new Date();
    var author = this.author;
    var year = date.getFullYear();
    var componentName = this.componentName;
    var componentNamespace = this.componentNamespace;

    // Copy Package.json and inject name
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name: name }
    );

    // Copy bower.json and inject name
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      { name: name }
    );

    // Copy .travis.yml and inject name
    this.fs.copyTpl(
      this.templatePath('_travis.yml'),
      this.destinationPath('.travis.yml'),
      { name: name }
    );

    // Copy README.md and inject name
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      { name: name, year: year, author: author }
    );


    // Copy CONTRIBUTING.md and inject name
    this.fs.copyTpl(
      this.templatePath('_CONTRIBUTING.md'),
      this.destinationPath('CONTRIBUTING.md'),
      { name: name }
    );

    // Copy LICENCE.md and inject name
    this.fs.copyTpl(
      this.templatePath('_LICENSE'),
      this.destinationPath('LICENSE'),
      { name: name }
    );

    // Copy Gruntfile.js and inject name
    this.fs.copyTpl(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      { name: name }
    );

    // Copy karma.config.js and inject name
    this.fs.copyTpl(
      this.templatePath('_karma.conf.js'),
      this.destinationPath('karma.conf.js'),
      { name: name }
    );


    // Create boilerplate js
    this.fs.copyTpl(
      this.templatePath('_script.js'),
      this.destinationPath('src/' + componentName + '.js'),
      {
        name: name,
        componentName: componentName,
        componentNamespace: componentNamespace
      }
    );

    // Create test boilerplate
    this.fs.copyTpl(
      this.templatePath('_test.spec.js'),
      this.destinationPath('test/' + componentName + '.spec.js'),
      {
        name: name,
        componentName: componentName,
        componentNamespace: componentNamespace
      }
    );

  }
});
