class AgeProblem {
    static class InvalidAgeException extends Exception {
        InvalidAgeException(String msg) { super(msg); }
    }

    public static void main(String[] args) {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        System.out.print("Enter your age: ");
        try {
            int age = Integer.parseInt(sc.nextLine());
            if (age < 18) throw new InvalidAgeException("Age must be at least 18");
            System.out.println("Age accepted: " + age);
        } catch (InvalidAgeException e) {
            System.out.println("InvalidAgeException: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Enter a valid number.");
        } finally {
            sc.close();
        }
    }
}