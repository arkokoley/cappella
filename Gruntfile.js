module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  'electron-debian-installer': {
    options: {
      productName: 'Cappella',
      productDescription: 'A peer to peer streaming music player.',
      section: 'devel',
      priority: 'optional',
      lintianOverrides: [
        'changelog-file-missing-in-native-package',
        'executable-not-elf-or-script',
        'extra-license-file'
      ],
      categories: [
        'Sound & Video'
      ]
    },

    linux64: {
      options: {
        arch: 'amd64'
      },
      src: 'build/linux/Cappella-linux-x64',
      dest: 'release/cappella_amd64.deb'
    },

  }
  });

  grunt.loadNpmTasks('grunt-electron-debian-installer');

    // Default task(s).
};
