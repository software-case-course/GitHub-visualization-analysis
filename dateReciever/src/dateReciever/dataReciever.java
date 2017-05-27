package dateReciever;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class dataReciever {
public static void main(String args[]){
	try{
		System.out.println("start");
		Process pr=Runtime.getRuntime().exec("python cgi.py");
		BufferedReader in=new BufferedReader(new InputStreamReader(pr.getInputStream()));
		String line;
		while((line=in.readLine())!=null){
			if(isDouble(line)||isInteger(line))
			{System.out.println(line);}
		}
		in.close();
		pr.waitFor();
		System.out.println("end");
	}catch(Exception e){
		e.printStackTrace();
	}
}

private static boolean isInteger(String str) {  
    if (null == str || "".equals(str)) {  
        return false;  
    }  
    Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");  
    return pattern.matcher(str).matches();  
}  
  

private static boolean isDouble(String str) {  
    if (null == str || "".equals(str)) {  
        return false;  
    }  
    Pattern pattern = Pattern.compile("^[-\\+]?[.\\d]*$");  
    return pattern.matcher(str).matches();  
} 
}
