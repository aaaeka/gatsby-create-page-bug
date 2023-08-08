const path = require(`path`);
const postTemplate = path.resolve(`./src/templates/template.tsx`);
const postTemplateNoContent = path.resolve(`./src/templates/templateNoContent.tsx`);

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  // createPage with __contentFilePath (shows up in onCreatePage)
  data.allMdx.nodes.forEach((node) => {
    actions.createPage({
      path: node.frontmatter.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });

  // createPage without __contentFilePath (doesn't show up in onCreatePage, works as expected)
  actions.createPage({
    path: '/test/',
    component: postTemplateNoContent,
  });
};

exports.onCreatePage = async ({ page }) => {
  console.log('Created pages: ', page.path);
}