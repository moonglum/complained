module.exports = function(babel) {
  let t = babel.types;

  return {
    visitor: {
      JSXElement: function(path) {
        // TODO: Check if the template name starts with a upper or lower case letter
        // only do this stuff when it begins with a lower case letter,
        // otherwise use the default implementation
        let tagName = path.node.openingElement.name.name;

        let attributes = path.node.openingElement.attributes.map(child => {
          // TODO: The value could be something that is not a literal,
          // then we need to use a template String
          return `${child.name.name}="${child.value.value}"`;
        }).join(" ");

        path.replaceWith(
          t.binaryExpression(
            "+",
            t.binaryExpression(
              "+",
              t.stringLiteral(`<${tagName} ${attributes}>`),
              // TODO: This is where the traversal should continue with the children
              t.stringLiteral("hi")
            ),
            t.stringLiteral(`</${tagName}>`)
          )
        );
      }
    }
  };
};
