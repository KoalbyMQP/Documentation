---
id: markdown-guide
title: Writing Documentation with Markdown
sidebar_label: Markdown Guide
sidebar_position: 1
---

# Writing Documentation with Markdown

This guide will teach you how to write documentation using Markdown and manage your content using Git and GitHub Desktop.

## Getting Started

### Prerequisites
- [GitHub Account](https://github.com/signup)
- [GitHub Desktop](https://desktop.github.com/)
- A text editor (we recommend [VS Code](https://code.visualstudio.com/))

### Setting Up Your Environment

1. **Clone the Repository**
   - Open GitHub Desktop
   - Go to File > Clone Repository
   - Select the documentation repository
   - Choose a local path
   - Click "Clone"

2. **Open in VS Code**
   - In GitHub Desktop, click "Open in Visual Studio Code"
   - Install recommended extensions:
     - Markdown All in One
     - markdownlint

## Writing Documentation

### File Structure

Documentation files should be organized as follows:
```
docs/
├── category-name/
│   ├── _category_.json
│   ├── index.md
│   └── article.md
└── another-category/
    ├── _category_.json
    └── index.md
```

### Creating New Content

1. **Create a New File**
   - Create a `.md` file in the appropriate directory
   - Use lowercase with hyphens for filenames (e.g., `getting-started.md`)

2. **Add Frontmatter**
   ```yaml
   ---
   id: unique-id
   title: Your Page Title
   sidebar_label: Sidebar Label
   sidebar_position: 1
   ---
   ```

### Markdown Syntax

#### Headers
```markdown
# H1 Title
## H2 Subtitle
### H3 Section
#### H4 Subsection
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`
```

#### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Second item
   1. Nested ordered item
```

#### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](./images/example.png)
```

#### Code Blocks
````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

#### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

#### Admonitions
```markdown
:::note
This is a note
:::

:::tip
This is a tip
:::

:::warning
This is a warning
:::

:::danger
This is a dangerous warning
:::

:::info
This is useful information
:::
```

#### Advanced Features

##### Tabs
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="windows" label="Windows">
    Windows-specific content
  </TabItem>
  <TabItem value="mac" label="macOS">
    macOS-specific content
  </TabItem>
</Tabs>
```

##### Details
```markdown
<details>
  <summary>Click to expand!</summary>
  Hidden content here...
</details>
```

##### LaTeX Math
```markdown
Math expression in a line: $\sum_{i=1}^n x_i$

Math expression in a block:
$$
\sum_{i=1}^n x_i
$$
```

## Managing Changes

### Using GitHub Desktop

1. **Making Changes**
   - Open the repository in VS Code
   - Make your changes
   - Save the files

2. **Committing Changes**
   - Open GitHub Desktop
   - Review your changes
   - Write a descriptive commit message:
     - Summary: Brief description (50 chars or less)
     - Description: Detailed explanation if needed
   - Click "Commit to main"

3. **Pushing Changes**
   - Click "Push origin" to upload your changes
   - Your changes will be deployed automatically

### Best Practices

1. **Commit Messages**
   - Use clear, descriptive messages
   - Start with a verb (Add, Update, Fix, etc.)
   - Example: "Add installation guide for Windows users"

2. **File Organization**
   - Keep related files together
   - Use meaningful directory names
   - Include images in an `images` subdirectory

3. **Content Guidelines**
   - Write clear, concise content
   - Use proper heading hierarchy
   - Include code examples when relevant
   - Add screenshots for visual guidance
   - Break long pages into sections
   - Use admonitions to highlight important information

## Previewing Changes

1. **Using VS Code Preview**
   - Open your Markdown file
   - Press `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (Mac)
   - Preview updates as you type

2. **Using Local Development Server**
   - Follow the [Local Testing Guide](../local-testing/index.md)
   - Changes appear in real-time

## Common Issues and Solutions

1. **Images Not Displaying**
   - Check file path is relative to the Markdown file
   - Verify image exists in the specified location
   - Ensure correct file permissions

2. **Formatting Problems**
   - Use markdownlint to check for issues
   - Verify frontmatter syntax
   - Check for proper indentation

3. **Deployment Issues**
   - Verify all files are committed
   - Check build logs in Netlify
   - Ensure no broken links

Remember: Always preview your changes locally before pushing them to ensure everything looks correct. 