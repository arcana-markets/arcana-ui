# 🧙‍♂️ Arcana Markets Web App

The arcana web app is a Next.js / Typescript project that elevates the DeFi experience on Solana by offering a comprehensive suite including token vaults, data analytics, interactive charts, a swap application, customized tools and access to bots.

Responsive                     |  Desktop
:-------------------------:|:-------------------------:
![](arcana-ui-mobile.png)  |  ![](arcana-ui-desktop.png)

## 🚀 Quickstart

To get started, follow these steps:

#### **Testers:** Download or Fork the repo and run a local project:
1. **Clone the repo:** Begin by cloning the repository using the command:

```bash
git clone git@github.com:arcana-markets/arcana-ui.git
```

2. **Install Dependencies:** Move into the directory and install the dependencies:

```bash
cd arcana-ui

npm install 
# or
bun install
```

3. **Run the app:**

```bash

npm run dev
# or
bun dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
 
### Structure

The below is an example structure for the project
 
```
├── public : publically hosted files
├── src : primary code folders and files 
│   ├── app
│   ├── components`
│   ├── hooks` 
│   ├── config` 
│   ├── contexts`
│   ├── stores`
│   ├── types` 
│   ├── utils` 
tailwind, package, configuration, and other project files
```

# 🤝 Contributing

We welcome contributions from the community to help improve the Arcana Markets Web App. To contribute, please follow these steps:

## Submitting PRs

1. **Fork, Clone, and Branch:**
   - Fork the repository by clicking the "Fork" button at the top right of the repository page on GitHub.
   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Make and Commit Changes:**
   - Make your changes to the codebase, ensuring your code follows the project's coding standards and conventions. Add or update tests as needed.
   - Commit your changes with a descriptive commit message:
     ```bash
     git commit -m "Add feature: description of your feature"
     ```

3. **Push and Create a Pull Request:**
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```
   - Go to the original repository on GitHub, click the "Pull Request" button, and select your branch. Provide a clear and descriptive title and description for your pull request, link any relevant issues, and click "Create Pull Request".

## Guidelines

- Ensure your code is well-documented and follows the project's style guide.
- Write clear, concise commit messages.
- Test your changes thoroughly before submitting a pull request.
- Be responsive to feedback and willing to make necessary changes.
     
## Key Features

- **Token Vaults UI:** Yield-generating DeFi protocol.
- **DEX Data Analytics:** Advanced data structures for Solana decentralized exchanges.
- **Services & Tools:** Swap, devnet SPL token-faucets, external bots.


# 🏦 Token Vaults Program

The Token Vaults program is a crucial component of our ecosystem, enabling secure and efficient token storage and transactions. For detailed information, implementation details, and to contribute, please visit the Arcana Vaults repository.

<a href="https://github.com/arcana-markets/arcana-vaults">
  <img src="https://img.shields.io/badge/Arcana-Vaults-blue" alt="Arcana Vaults" style="height: 30px;"/>
</a>

### Deployed Versions

| Tag  | Network | Program ID                                  |
| ---- | ------- | ------------------------------------------- |
| v0.1 | Devnet  | `FVbmcn58GVgYAGYqtQwVWwWrTDbSFqwXfCrErGEGo1mx` |

# 📈 Data & Infrastructure

Our ecosystem leverages cutting-edge data management and analytics to ensure seamless operations and performance enhancement. Below are the key components of our Data & Infrastructure layer:

### Arcana Data

The **Arcana Data APIs** act as a gateway to the Arcana ecosystem, enabling seamless interactions between developers, applications, and our extensive data layers. These APIs offer structured access to datasets and analytics, crucial for building robust and scalable DeFi applications.

<a href="https://github.com/arcana-markets/arcana-data">
  <img src="https://img.shields.io/badge/Arcana-Data-blue" alt="Arcana Data" style="height: 30px;"/>
</a>

### API Streams

  - `prod.arcana.markets/api/openbookv2/markets`
  - `prod.arcana.markets/api/phoenix/markets`

### Arcana Indexer

To complement our data repository, the **Arcana Data Indexer** plays a pivotal role in indexing on-chain DEX data. This ensures quick and reliable access to transaction data, enhancing our market-making strategies and operational efficiency.

  - `/trades`
  - `/orders`

# License

Arcana Web App is licensed under the MIT License. For more information, see the LICENSE file in the project repository.
