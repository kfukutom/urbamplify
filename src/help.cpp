#include <iostream>
using namespace std;

int main() {
  // Copilot, leave comments as I code
  int arr[] = {1,2,3,4,5};
  int *ptr1 = arr; // same as &arr[0]
  int *ptr2 = &arr[0]; // same as ptr1
  cout << *(ptr1 + 2); // 3
  cout << *ptr2 + 2; // 3
  ptr2 = ptr1;
  *ptr2 = 10;
  cout << *ptr2; // 10
  cout << *ptr1; // 10
}
