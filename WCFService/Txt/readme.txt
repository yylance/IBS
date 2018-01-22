一、概述

　　Windows Communication Foundation(WCF)是由微软发展的一组数据通信的应用程序开发接口，可以翻译为Windows通讯接口，它是.NET框架的一部分。由 .NET Framework 3.0 开始引入。

　　WCF的最终目标是通过进程或不同的系统、通过本地网络或是通过Internet收发客户和服务之间的消息。

　　WCF合并了Web服务、.net Remoting、消息队列和Enterprise Services的功能并集成在Visual Studio中。

　　WCF专门用于面向服务开发。

二、基于Asp.net 的应用程序开发与面向服务开发
		在基于Asp.net 的应用程序开发中，我们由客户机的浏览器访问应用程序服务器，然后通过应用程序服务器中的数据库连接去连接数据库服务器，读取或是操作数据，
	有时候可能会多一个文件服务器。大家可以观察到，基本上所有的应用都放在了一台服务器上，但对于一个，由于业务上的需要（如：与外部系统交互），一台服务器很难支持所有的应用。我们再看下面的图：
		客户机使用浏览器访问服务器A，服务器A为了业务需要与其他各种应用部署在服务器B、C、D....再通过WCF技术互相通信，相互访问...然而面向服务的好处不仅仅在此，
	他还提供了不同语言不同操作系统的可交互性..由于本文不是介绍SOA的文章，感兴趣的同学可以参见：SOA
三、第一个WCF程序
　　1. 新建立空白解决方案，并在解决方案中新建项目，项目类型为：WCF服务应用程序。
	2.删除系统生成的两个文件IService1.cs与Service1.svc。
	3.添加自定义的WCF【服务文件】User.svc，此时vs2010会自动生成WCF接口文件IUser.cs，我们在IUser中定义WCF方法ShowName，在User.svc.cs对该接口的方法进行实现。
	代码如下：
	using System.ServiceModel;

	namespace WCFService
	{
		[ServiceContract]
		public interface IUser
		{
			[OperationContract]
			string ShowName(string name);
		}
	}


	namespace WCFService
	{
		public class User : IUser
		{
			public string ShowName(string name)
			{
				string wcfName = string.Format("WCF服务，显示姓名：{0}", name);
				return wcfName;
			}
		}
	}
	大家可以看到，在WCF中的接口与普通接口的区别只在于两个上下文，其他的和我们正常学习的接口一样。定义这个上下文要添加System.ServiceModel的引用。

	[ServiceContract]，来说明接口是一个WCF的接口，如果不加的话，将不能被外部调用。

	[OperationContract]，来说明该方法是一个WCF接口的方法，不加的话同上。 

	此时我们的第一个WCF服务程序就建立好了，将User.svc“设为起始页”，然后F5运行一下试试，如下图所示，VS2010自动调用了WCF的客户端测试工具以便我们测试程序：
	我们双击上图中的 ShowName() 方法，
	在请求窗口中的值中输入参数“你的姓名”，然后点击“调用”，在响应窗口中会出现返回值“WCF服务，显示姓名：你的姓名”，说明测试成功，点击下面的XML也可以看到XML的数据传输。
我们现在建立好了服务的应用程序和业务逻辑，即非常简单的打印姓名的方法，测试也成功了。那么我们怎么用呢？

四、场景
　　我们设计的场景是在生产中经常应用的场景，把WCF程序寄宿在IIS之上。假设场景如下：A服务器和B服务器。我们把我们刚刚建立的WCF程序“部署”在B服务器上(本教程的A,B服务器都放是我自己的一台机器)，
我们的目标是在A服务器的应用程序来访问B服务器的WCF程序，实现服务器端的应用程序通讯。

五、将WCF程序寄宿在B服务器的IIS之上
　　首先我们将WCF应用程序发布一下，然后部署在B服务器的IIS之上
	鼠标右键浏览Uesr.svc，在游览器中出现如下图所示，说明服务部署成功。
六、在客户端[A服务器]创建服务的引用
　　我们这里以Web应用程序为例，建立地物理地址为本机，但是大家可以想像成B服务器是远程计算机，localhost为一个其他的IP地址。
　　新建解决方案，并且创建ASP.NET Web应用程序的项目。命名为：WCFClient
	(1)新建Asp.net页面，命名为：WcfTest.aspx。
	(2)添加在第五步中部署的服务的引用。
