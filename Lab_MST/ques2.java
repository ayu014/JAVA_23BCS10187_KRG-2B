import java.util.ArrayList;
import java.util.Scanner;

public class ques2 {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter how many numbers: ");
        int count = sc.nextInt();
        
        for (int i = 0; i < count; i++) {
            System.out.print("Enter number: ");
            numbers.add(sc.nextInt());
        }
        
        try {
            if (numbers.isEmpty()) {
                throw new ArithmeticException("List is empty - cannot divide by zero");
            }
            
            int sum = 0;
            for (int num : numbers) {
                sum += num;
            }
            
            double average = (double) sum / numbers.size();
            System.out.println("Average: " + average);
            
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        sc.close();
    }
}
