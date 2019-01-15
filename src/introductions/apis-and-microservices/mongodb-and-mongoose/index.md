---
title: Introduction to the MongoDB and Mongoose Challenges
block: MongoDB and Mongoose
superBlock: APIs and Microservices
---
## MongoDB 和 Mongoose 关卡的介绍

MongoDB 是一个用来存储应用数据的数据库。Mongo 是一个非关系，“NoSQL” 的数据库。也就是说 Mongo 在一个记录里存储所有的数据，而不是像关系数据库那样存储在多个预设的表中。这种存储结构有很多好处：

- 可扩展：一般来讲，非关系型数据库可以分布式存储在不同的操作系统间。这意味着它可以以低成本方便的提高性能。
- 灵活：新的数据集和属性可以直接添加进文档而无需更改表。
- 可复制：可以并行拷贝数据，如果数据损坏了，备份也可以成为主数据源。

现在已经有很多的非关系数据库了，Mongo 支持 JSON 形式的指令查询，所以它是学习 JavaScript 后端的不二选择。因为通过它访问文档或者属性可以像访问 JavaScript 的对象一样方便。

接下来的这些挑战要求你在 Glitch 里完成，而且要在下面提供的初始化项目的基础上编写代码。在完成一个挑战后你需要复制你的 Glitch 链接（你的 app 链接）到挑战页面来通过关卡。另外，你也可以选择其他平台来编写你的项目，不过要确保它是公开的，以便我们测试。

在 Glitch 上使用[这个链接](https://glitch.com/#!/import/github/freeCodeCamp/boilerplate-mongomongoose/)开始项目，或者克隆 Github 上的[这个仓库](https://github.com/freeCodeCamp/boilerplate-mongomongoose/)。如果你使用 Glitch，别忘了把你项目链接备份到一个可靠的地方。


## 使用 mLab 给你的项目托管一个免费的 mongodb 实例

在接下来的挑战里，我们将要使用 MongoDB 来存储数据。为了简化配置，我们将会使用 mLab。

mLab 是一个 MongoDB 数据服务平台，这意味着他们会为你配置托管数据库，我们唯一要关注的就是：数据！接下来我们将：

- 创建一个 mLab 账号
- 创建一个免费的在线数据库
- 给你的数据库创建一个新的 admin 账户，以便你能访问数据库
- 获取 mLab URI，应用使用这个 URI 来连接数据库

### 创建一个 mLab 账号

让我们从<a href='https://mlab.com/' target='_blank' rel='no-follow'>进入 mLab 页面</a>开始。

一旦你打开 mLab 页面，接下来就是注册一个新用户。

- 单击右上方的 <a href='https://mlab.com/signup/' target='_blank' rel='no-follow'>Sign Up</a> 按钮打开注册页面。
- 用正确的信息填写注册表单并提交。
- 你应该登录进一个新的、未激活的账户页面。
- 在页面上方，会显示一个信息询问你是否要发送邮件激活账户，发送并确认激活。
- 当激活了你的账户后，单击 *MongoDB Deployments*  部分的 **Create new** 按钮。

### 创建一个免费的在线数据库

现在我们将要创建即将用到的真实的数据库。

- 在可选的列表里选择 *Cloud Provider*。
- 选择 *Sandbox* 计划，这是唯一一个免费的计划，单击 **Continue**。
- 在可选的列表里给 Sandbox 选择一个 region，单击 **Continue**。
- 给数据库输入一个名字。这个名字将会出现在数据库的 URI 里。然后，单击 **Continue**。

上面会显示所有步骤的摘要信息，允许你更改任意步骤信息。单击 **Submit Order** 来提交。

### 在数据库上创建一个新的 admin 用户

在确认你的配置后，在 *MongoDB Deployments* 部分应该出现了一个新的 sandbox。现在我们来创建一个可以操作数据库的管理员。

- 单击新创建的数据库。
- 单击 *Users*。
- 单击 **Add database user** 按钮。
- 输入管理员的用户名和密码。不要把它标记为已读，否则你将不能给数据库添加任何数据。

### 获取 mLab URI

就快完成了，我们已经创建了一个新的数据库以及一个可以访问它的帐户，接下来要做的就是在应用里访问它。

- 在数据库页，你应该能看到一些使用 MongoDB URI 连接数据库的介绍。
- 找到看起来像这样的那行 `mongodb://dbuser:dbpassword@ds0<PORT>.mlab.com:<PORT>/<DATABASE-NAME>`。
- 复制这行，把 dbuser 和 dbpassword 替换成你之前创建的管理员的用户和密码。
- 就是它了，这个 URI 就是要在应用里使用，连接数据库用的。保存这个 URI 到一个地方备用。
- 如果多个应用间没有共享的数据，可以为每个应用创建不同的数据库，你只需在创建一个 sandbox、用户并获取一个新的 URI 即可。