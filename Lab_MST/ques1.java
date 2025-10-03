import java.util.ArrayList;

class ques1 {
    private ArrayList<String> studentNames = new ArrayList<>();
    

    public void addName(String name) {
        studentNames.add(name);
        System.out.println("Added: " + name);
    }
    
    public void removeName(String name){
        if (studentNames.isEmpty()) {
           System.out.println("List is Empty!");
        }
        else{
            studentNames.remove(name);
        System.out.println("Removed: " + name);
        }
        
    }
    
    public static void main(String[] args) {
        ques1 obj = new ques1();
        
        obj.addName("Alice");
        obj.addName("Bob");
    
        try {
            obj.removeName("Alice");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        

        try {
            obj.removeName("Bob");
            obj.removeName("Charlie");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}



// //Question 1: Java Collection Framework
// Write a Java program that uses an ArrayList to store a list of student names.
//  Implement a method to add a name, remove a name. Handle the
// case where the list is empty using a custom exception.

