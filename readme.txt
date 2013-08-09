AWS Resource View(ARV) is a webapp that allows users to review their AWS resource, which is based on the Netfliex Edda. Information includes EC2 Instance, S3 Buckets, AutoScaling Groups and Security Groups, users can not only keep track of the current information, but can also review the past records. And for instance, it provides advanced search and filter function, allowing users to search their instances using AMI, IP address, tags, etc.

To use it, you need to do the following steps:

1)Set up the account information and other related information in edda.properties file, which is in /WEB-INF/class/,the prerequisite is that you have extract the .war file.

2)The default PermGen size is too small for gradle with scala most of the time also Edda stores all the AWS resources in memory so it can consume more memory that is typically allocated to Java, so increase the PermGen size and memory limits with this:

 $ export JAVA_OPTS="-XX:MaxPermSize=256M -Xmx1g"

3)Install MongoDB database(http://www.mongodb.org/downloads) and run it.
to run it, you can use the command(mongo-data is the directory created by youself): 
  
	mongod --dbpath = mongo-data

4)Since it's a webapp, you need to run it on some server, as for me, I use Tomcat7(http://tomcat.apache.org/download-70.cgi). After starting the server, it takes several seconds to read your AWS resource information. 

5)Congratulations, you have started it, run it using any browers you like(the url should be something like Server URL/edda, as for me it's localhost:8080/edda.
