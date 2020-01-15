module.exports = {
    rules: [
      {
        test: /\.less$/,
        use: [
          // ...other loaders
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                red: '#03a9f4',
                blue: '#3eaf7c',
                orange: '#f08d49',
                'text-color': '#111'
              }
            }
          }
        ]
      }
    ]
  };