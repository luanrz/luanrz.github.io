import{_ as a,o as s,c as t,a2 as p}from"./chunks/framework.BZAK_utg.js";const g=JSON.parse('{"title":"Java文件流与策略模式的综合运用：用两种方式完成文件读写操作","description":"","frontmatter":{"title":"Java文件流与策略模式的综合运用：用两种方式完成文件读写操作","date":"2019-05-20","categories":["编程语言","Java"],"tags":["Java","IO","设计模式"],"prevTitle":"树莓派配置","prevLink":"../安装配置/树莓派配置.html","nextTitle":"ArchLinux下LAMP的安装","nextLink":"../安装配置/ArchLinux下LAMP的安装.html"},"headers":[],"relativePath":"posts/编程语言/Java文件流与策略模式的综合运用：用两种方式完成文件读写操作.md","filePath":"posts/编程语言/Java文件流与策略模式的综合运用：用两种方式完成文件读写操作.md"}'),e={name:"posts/编程语言/Java文件流与策略模式的综合运用：用两种方式完成文件读写操作.md"};function l(i,n,c,r,o,u){return s(),t("div",null,[...n[0]||(n[0]=[p(`<h1 id="java文件流与策略模式的综合运用-用两种方式完成文件读写操作" tabindex="-1">Java文件流与策略模式的综合运用：用两种方式完成文件读写操作 <a class="header-anchor" href="#java文件流与策略模式的综合运用-用两种方式完成文件读写操作" aria-label="Permalink to &quot;Java文件流与策略模式的综合运用：用两种方式完成文件读写操作&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>文件分为文本文件和非文本文件（二进制文件，如音频、图片文件等），此处讨论的主要是文本文件。</p><p>文件的读写操作基于Java的I/O流，Java流分为字节流与字符流，它们都可以实现文件的读写操作。一般而言，字符流专注于处理文本文件，而字节流则更为通用，所有类型的文件均可操作。基于此，文本文件的读写操作有两种不同的策略：字节流文件读写与字符流文件读写。</p><h2 id="文件流的继承关系" tabindex="-1">文件流的继承关系 <a class="header-anchor" href="#文件流的继承关系" aria-label="Permalink to &quot;文件流的继承关系&quot;">​</a></h2><pre class="mermaid">%%{init: {&#39;flowchart&#39;: {&#39;wrappingWidth&#39;: 2000}}}%%
graph LR
    流 --&gt; 字节流
    流 --&gt; 字符流

    字节流 --&gt; InputStream
    字节流 --&gt; OutputStream

    InputStream --&gt; FileInputStream
    InputStream --&gt; FilterInputStream
    FilterInputStream --&gt; BufferedInputStream

    OutputStream --&gt; FileOutputStream
    OutputStream --&gt; FilterOutputStream
    FilterOutputStream --&gt; BufferedOutputStream

    字符流 --&gt; Reader
    字符流 --&gt; Writer

    Reader --&gt; InputStreamReader
    InputStreamReader --&gt; FileReader
    Reader --&gt; BufferedReader

    Writer --&gt; OutputStreamWriter
    OutputStreamWriter --&gt; FileWriter
    Writer --&gt; BufferedWriter</pre><h2 id="用策略模式组织代码结构" tabindex="-1">用策略模式组织代码结构 <a class="header-anchor" href="#用策略模式组织代码结构" aria-label="Permalink to &quot;用策略模式组织代码结构&quot;">​</a></h2><p>策略模式的核心设计思想是：多种算法相互可替换，每一种算法称之为一种策略。本案例中文本文件的读写操作存在两个策略，即基于字节流的文件读写策略与基于字符流的文件读写策略。</p><h3 id="抽象策略类——待实现功能的接口描述" tabindex="-1">抽象策略类——待实现功能的接口描述 <a class="header-anchor" href="#抽象策略类——待实现功能的接口描述" aria-label="Permalink to &quot;抽象策略类——待实现功能的接口描述&quot;">​</a></h3><p>文本文件的操作主要分为读和写两种，抽象策略类（接口）包含了这两个方法，其规定了其子类（具体策略类）需要实现的具体功能。</p><blockquote><p>RWStrategy.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//抽象策略类</span></span>
<span class="line"><span>public interface RWStrategy {</span></span>
<span class="line"><span>	// 文件操作：读</span></span>
<span class="line"><span>	public String read(File file);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 文件操作：写</span></span>
<span class="line"><span>	public void write(File file, String content);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="具体策略类——待实现功能的具体方案" tabindex="-1">具体策略类——待实现功能的具体方案 <a class="header-anchor" href="#具体策略类——待实现功能的具体方案" aria-label="Permalink to &quot;具体策略类——待实现功能的具体方案&quot;">​</a></h3><p>具体策略类是抽象具体类（接口）的实现。下述代码中，<code>StrategyA</code>表示字节流文件读写策略，<code>StrategyB</code>表示字符流文件读写策略。</p><blockquote><p>RWStrategyA.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//具体策略类</span></span>
<span class="line"><span>public class RWStrategyA implements RWStrategy {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public String read(File file) {</span></span>
<span class="line"><span>		String content = &quot;&quot;;</span></span>
<span class="line"><span>		try (FileInputStream fis = new FileInputStream(file); BufferedInputStream bis = new BufferedInputStream(fis);) {</span></span>
<span class="line"><span>			Long length = file.length();</span></span>
<span class="line"><span>			byte[] bytes = new byte[length.intValue()];</span></span>
<span class="line"><span>			bis.read(bytes);</span></span>
<span class="line"><span>			content = new String(bytes);</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return content;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public void write(File file, String content) {</span></span>
<span class="line"><span>		try (FileOutputStream fos = new FileOutputStream(file);</span></span>
<span class="line"><span>				BufferedOutputStream bos = new BufferedOutputStream(fos);) {</span></span>
<span class="line"><span>			byte[] bytes = content.getBytes();</span></span>
<span class="line"><span>			bos.write(bytes);</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 单例</span></span>
<span class="line"><span>	private static RWStrategyA strategy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static RWStrategyA newInstance() {</span></span>
<span class="line"><span>		if (strategy == null) {</span></span>
<span class="line"><span>			strategy = new RWStrategyA();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return strategy;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	private RWStrategyA() {</span></span>
<span class="line"><span>	};</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p>RWStrategyB.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//具体策略类</span></span>
<span class="line"><span>public class RWStrategyB implements RWStrategy {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public String read(File file) {</span></span>
<span class="line"><span>		String content = &quot;&quot;;</span></span>
<span class="line"><span>		try (FileReader fr = new FileReader(file); BufferedReader br = new BufferedReader(fr)) {</span></span>
<span class="line"><span>			Long length = file.length();</span></span>
<span class="line"><span>			char[] chars = new char[length.intValue()];// 实际字符数组长度比这个小</span></span>
<span class="line"><span>			br.read(chars);</span></span>
<span class="line"><span>			content = new String(chars);</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return content;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public void write(File file, String content) {</span></span>
<span class="line"><span>		try (FileWriter fw = new FileWriter(file); BufferedWriter bw = new BufferedWriter(fw);) {</span></span>
<span class="line"><span>			char[] chars = content.toCharArray();</span></span>
<span class="line"><span>			bw.write(chars);</span></span>
<span class="line"><span>//			bw.write(content);</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 单例</span></span>
<span class="line"><span>	private static RWStrategyB strategy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static RWStrategyB newInstance() {</span></span>
<span class="line"><span>		if (strategy == null) {</span></span>
<span class="line"><span>			strategy = new RWStrategyB();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return strategy;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	private RWStrategyB() {</span></span>
<span class="line"><span>	};</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>由于具体策略类不需要创建多个对象，故使用到了单例模式。 在具体策略类中使用newInstance()方法获取单例对象，使类的创建与类的使用分离，这样其它类获取当前类的实例时就不需要使用new关键字了。</p><h3 id="环境类" tabindex="-1">环境类 <a class="header-anchor" href="#环境类" aria-label="Permalink to &quot;环境类&quot;">​</a></h3><p>环境类是主类（使用策略的类）与策略类的桥梁。 环境类维护了一个具体策略类，这个具体策略类的选择由构造函数的参数决定。</p><ul><li>构造方法一：直接注入具体策略类对象，这个具体策略类对象由主类创建</li><li>构造方法二：根据枚举值自动创建具体策略类对象</li><li>构造方法三：默认创建某一个具体策略类</li></ul><p>同时，环境类提供了对应的接口方法，该方法将调用具体策略类中的对应方法，这样做的好处是可以隐藏策略类的细节，即使主类不需要知道策略类的具体方法名也能够调用对应的策略方法。</p><blockquote><p>RWContext.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//环境类</span></span>
<span class="line"><span>public class RWContext {</span></span>
<span class="line"><span>	// 策略对象</span></span>
<span class="line"><span>	private RWStrategy strategy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 构造函数：传入策略对象</span></span>
<span class="line"><span>	public RWContext(RWStrategy strategy) {</span></span>
<span class="line"><span>		this.strategy = strategy;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 构造函数：传入策略枚举值</span></span>
<span class="line"><span>	public RWContext(RWStrategyEnum strategyEnum) {</span></span>
<span class="line"><span>		switch (strategyEnum) {</span></span>
<span class="line"><span>		case BYTE_STREAM_STRATEG:</span></span>
<span class="line"><span>			strategy = RWStrategyA.newInstance();</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		case CHARACTER_STREAM_STRATEGY:</span></span>
<span class="line"><span>			strategy = RWStrategyB.newInstance();</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 构造函数：默认</span></span>
<span class="line"><span>	public RWContext() {</span></span>
<span class="line"><span>		strategy = RWStrategyA.newInstance();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 策略方法：从文件中读取内容</span></span>
<span class="line"><span>	public String readFromFile(File file) {</span></span>
<span class="line"><span>		return strategy.read(file);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 策略方法：向文件中写入内容</span></span>
<span class="line"><span>	public void writeToFile(File file, String content) {</span></span>
<span class="line"><span>		strategy.write(file, content);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>枚举中有两个值，对应着两种策略，主要用于环境类中选择性创建具体策略类对象。</p><blockquote><p>RWStrategyEnum.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public enum RWStrategyEnum {</span></span>
<span class="line"><span>	BYTE_STREAM_STRATEG, CHARACTER_STREAM_STRATEGY;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="主类" tabindex="-1">主类 <a class="header-anchor" href="#主类" aria-label="Permalink to &quot;主类&quot;">​</a></h3><p>通过主类类来测试两个具体策略类是否正常运行。</p><blockquote><p>RWMain.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class RWMain {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	static File file;</span></span>
<span class="line"><span>	static String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static void main(String args[]) throws IOException {</span></span>
<span class="line"><span>		file = new File(&quot;filerw.txt&quot;);</span></span>
<span class="line"><span>		if (!file.exists()) {</span></span>
<span class="line"><span>			file.createNewFile();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		runStrategyA();</span></span>
<span class="line"><span>		runStrategyB();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static void runStrategyA() {</span></span>
<span class="line"><span>		content = new SimpleDateFormat(&quot;yyyy-MM-dd hh:mm:ss &quot;).format(new Date()) + &quot;A\\n&quot;;</span></span>
<span class="line"><span>		RWContext context = new RWContext(RWStrategyEnum.BYTE_STREAM_STRATEG);</span></span>
<span class="line"><span>		String beforeWrite = context.readFromFile(file);</span></span>
<span class="line"><span>		context.writeToFile(file, beforeWrite + content);</span></span>
<span class="line"><span>		String afterWrite = context.readFromFile(file);</span></span>
<span class="line"><span>		System.out.println(&quot;A策略：\\n写入前：\\n&quot; + beforeWrite + &quot;\\n写入后:\\n&quot; + afterWrite);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static void runStrategyB() {</span></span>
<span class="line"><span>		content = new SimpleDateFormat(&quot;yyyy-MM-dd hh:mm:ss &quot;).format(new Date()) + &quot;B\\n&quot;;</span></span>
<span class="line"><span>		RWContext context = new RWContext(RWStrategyEnum.CHARACTER_STREAM_STRATEGY);</span></span>
<span class="line"><span>		String beforeWrite = context.readFromFile(file);</span></span>
<span class="line"><span>		context.writeToFile(file, beforeWrite + content);</span></span>
<span class="line"><span>		String afterWrite = context.readFromFile(file);</span></span>
<span class="line"><span>		System.out.println(&quot;B策略：\\n写入前：\\n&quot; + beforeWrite + &quot;写入后:\\n&quot; + afterWrite);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>字节流可以处理所有文件，字节流只能处理文本文件，同时，字符流的底层实现依赖于字节流。虽然本案例中用到了两种方式对文本文件进行了读写操作，但是术业有专攻，一般更推荐使用字符流的方式处理文本文件。字符输入流的readline()方法可读取一行。</p><p>关于字节流，read()与read(bytes[])分别在什么时候用？</p><p>我的理解是：</p><ul><li>当流中的字节数未知时使用read()，必须使用<code>while(InputStream.read()!=0)</code>一个字节一个字节读。</li><li>当流中的字节数已知时使用read(byte[]) ，创建指定长度的字节数组，然后调用<code>InputStream.read(byte[])</code>即可整体读入。</li></ul><p>那么问题来了，什么时候字节数已知呢？</p><ul><li>如果是文件流，那字节数组肯定已知，因为可以直接调用<code>File.length</code>获取字节长度。</li><li>其它情况统统按字节数未知处理，老老实实一个一个字节读。</li></ul><p>over。</p>`,40)])])}const h=a(e,[["render",l]]);export{g as __pageData,h as default};
