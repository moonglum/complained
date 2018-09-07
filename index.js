let fs = require('fs');
let babel = require('@babel/core');
let complained = require('./complained');

fs.readFile(process.argv[2], function(err, data) {
  if(err) {
    throw err;
  }

  let src = data.toString();

  let out = babel.transform(src, {
    plugins: ["@babel/plugin-syntax-jsx", complained]
  });

  console.log(out.code);

  // For Getting the AST
  // let out = babel.parseSync(src, {
  //   plugins: ["@babel/plugin-syntax-jsx", complained]
  // });

  // let util = require('util');
  // console.log(util.inspect(out.program, {showHidden: false, depth: null}))
});
