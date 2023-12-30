# React MUI

请按照以下步骤进行操作:

1. 打开您的 Wordpress 网站
2. 进入后台管理看板
3. 在左侧的导航菜单中选中 WarpDriven AI 选项, 打开插件设置页面
4. 按照以下规则填写表单:
   a. 填写 Recommendation API Key(这是必须的)
   b. 填写 Data Server Key(这不是必须的, 但数据看板功能依赖此项)
   c. 关闭 Test mode

补充:

关于 Recommendation API Key: 您可以在https://warpdriven.ai/connection/my-connection/中找到它. 请注意, 如果您在我们的平台连接了多个网站, 每个网站所对应的 Recommendation API Key 都是不同的, 不能相互混用

关于 Data Server Key: 默认情况下我们不会在与您的网站建立连接的同时生成一个 Data Server Key, 所以您不能像获取 Recommendation API Key 一样获取 Data Server Key. 请通过https://warpdriven.ai/ticket/来联系我们以获取它

关于 Test mode: 本插件的主要功能是在您的商品详情页中添加一个商品推荐组件, 您如果想在不打扰买家的情况下查看推荐组件的工作情况, 请开启 Test mode. Test mode 开启时, 仅当浏览器地址栏的查询参数中含有 wd_demo=true 时, 推荐组件才会开始工作

例如:
当 Test mode 开启时
https://yourstore.com/product/product-slug, 推荐组件不显示
https://yourstore.com/product/product-slug?wd_demo=true时, 推荐组件正常显示
https://yourstore.com/product/product-slug?else_search=else_value&wd_demo=true时, 推荐组件正常显示

当 Test mode 关闭时
只有您正确的填写了 Recommendation API Key 且您的商品已初始化成功, 推荐组件都会被展示给买家

关于 Custom Data Server: 默认情况下, 所有网站上的推荐组件工作情况会集中存储到同一台服务器上. 如果您出于安全性考虑 (或是想要定制商品的推荐算法) 希望我们单独处理您的数据, 请通过https://warpdriven.ai/ticket/来联系我们以获取它

关于 Custom JS: 默认情况下, 推荐组件的样式或许与您网站的风格并不一致, 或者您需要一些更加复杂的功能. 如果您希望我们单独为您的网站定制商品推荐插件, 请通过https://warpdriven.ai/ticket/来联系我们以获取它
