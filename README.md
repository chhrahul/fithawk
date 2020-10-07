# fithawk (fithawk)

a team management app

## Install the dependencies
```bash
yarn install
```

## DISABLE ESLINT 

to temporarily disable eslint visit `quasar.conf.us` and comment
out 

```cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          } 
```
