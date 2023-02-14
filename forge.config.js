module.exports = {
  packagerConfig: {
    icon: './mangaicon'
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
