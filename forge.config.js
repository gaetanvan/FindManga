module.exports = {
  packagerConfig: {
    icon: 'mangaicon.png'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'gaetanvan',
          name: 'FindManga',
        },
        authToken : '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',
        prerelease: false,
        draft: true,
      },
    },
  ],
};
