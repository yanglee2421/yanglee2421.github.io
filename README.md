# Single Page Application

## Next

1. Gradually abandon MUI and Toolpad, and gradually migrate existing features to [electron-react](https://github.com/yanglee2421/electron-react)

## Git

| 类型         | 含义                   | 示例                                              |
| ------------ | ---------------------- | ------------------------------------------------- |
| **feat**     | 新功能                 | `feat(auth): add JWT token validation`            |
| **fix**      | 修复 bug               | `fix(ui): correct button alignment on mobile`     |
| **docs**     | 文档修改               | `docs(readme): update installation guide`         |
| **style**    | 代码格式（不影响逻辑） | `style: format code using Prettier`               |
| **refactor** | 重构（非新增、非修复） | `refactor(core): simplify data pipeline`          |
| **perf**     | 性能优化               | `perf(api): reduce redundant DB queries`          |
| **test**     | 增加或修改测试         | `test(auth): add unit tests for token refresh`    |
| **chore**    | 构建流程、依赖管理等   | `chore(deps): upgrade eslint to v9`               |
| **ci**       | CI/CD 配置相关         | `ci(github): fix build pipeline trigger`          |
| **revert**   | 回滚之前的提交         | `revert: revert "feat(auth): add JWT validation"` |

### Statistics

统计项目文件数和代码行数（不包括 git 忽略的部分）：

```powershell
(git ls-files | ForEach-Object { (Get-Content $_ | Measure-Object -Line).Lines }) | Measure-Object -Sum
```

## TypeScript

### Interface & Type

| 功能       | type | interface |
| ---------- | ---- | --------- |
| 联合类型   | ✅   | ❎        |
| 类型别名   | ✅   | ❎        |
| 继承       | ❎   | ✅        |
| 声明合并   | ❎   | ✅        |
| 自引用定义 | ❎   | ✅        |

## Awesome

### Data Fetching

- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [axios](https://www.npmjs.com/package/axios)

### State Manage

- [zustand](https://www.npmjs.com/package/zustand)
- [immer](https://www.npmjs.com/package/immer)
- [use-immer](https://www.npmjs.com/package/use-immer)

### Validator

- [zod](https://www.npmjs.com/package/zod)

### Headless UI

- [@tanstack/react-form](https://www.npmjs.com/package/@tanstack/react-form)
- [@tanstack/react-table](https://www.npmjs.com/package/@tanstack/react-table)
- [@radix-ui/react-scroll-area](https://www.npmjs.com/package/@radix-ui/react-scroll-area)
- [@dnd-kit/core](https://www.npmjs.com/package/@dnd-kit/core)
- [@dnd-kit/sortable](https://www.npmjs.com/package/@dnd-kit/sortable)
- [@dnd-kit/utilities](https://www.npmjs.com/package/@dnd-kit/utilities)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)

### UI Kit

- [notistack](https://www.npmjs.com/package/notistack)
- [nprogress](https://www.npmjs.com/package/nprogress)
- [perfect-scrollbar](https://www.npmjs.com/package/perfect-scrollbar)

### Styling

- [clsx](https://www.npmjs.com/package/clsx)
- [classnames](https://www.npmjs.com/package/classnames)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [@emotion/react](https://www.npmjs.com/package/@emotion/react)
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled)
- [@emotion/cache](https://www.npmjs.com/package/@emotion/cache)

### Utilities

- [dayjs](https://www.npmjs.com/package/dayjs)
- [mathjs](https://www.npmjs.com/package/mathjs)

### Internationalization

- [i18next](https://www.npmjs.com/package/i18next)
- [react-i18next](https://www.npmjs.com/package/react-i18next)

### PDF

- [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)

### QRCode

- [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- [zxing-wasm](https://www.npmjs.com/package/zxing-wasm)

### Configuration

- [ini](https://www.npmjs.com/package/ini)
- [yaml](https://www.npmjs.com/package/yaml)
- [superjson](https://www.npmjs.com/package/superjson)

### Database

- [drizzle-orm](https://www.npmjs.com/package/drizzle-orm)
- [drizzle-kit](https://www.npmjs.com/package/drizzle-kit)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [dexie](https://www.npmjs.com/package/dexie)
- [dexie-react-hooks](https://www.npmjs.com/package/dexie-react-hooks)
- [localforage](https://www.npmjs.com/package/localforage)
- [mdb-reader](https://www.npmjs.com/package/mdb-reader)

### Chat

- [openai](https://www.npmjs.com/package/openai)

### PLC

- [modbus-serial](https://www.npmjs.com/package/modbus-serial)
