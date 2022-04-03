class Course {
  #price;
  set price(priceAmount) {
    if (priceAmount < 0) {
      throw `Assignment - Fourth Part - Checking the Price Amount using Setter 
            Error : Invalid Amount Entered - Price amount should be <= 0`;
    }
    this.#price = priceAmount;
  }

  get price() {
    return `\$${this._price}`;
  }

  constructor(courseLength, coursePrice, courseTitle) {
    this.title = courseTitle;
    this.price = coursePrice;
    this.length = courseLength;
  }

  calulatePrice() {
    return this.length / this.#price;
  }

  printCourseLogs() {
    console.log(`Course -
        Title : ${this.title}
        Price : ${this.price}
        Length : ${this.length}`);
  }
}

class CourseItems {
  courseItems = [];
  set courseItem(courseItem) {
    this.courseItems = [...this.courseItems, courseItem];
  }

  get courseItems() {
    return this.courseItems;
  }

  set courseItems(courseItems) {
    this.courseItems = [...this.courseItems, ...courseItems];
  }
}

class PracticalCourse extends Course {
  constructor(title, price, length, exerciseCount) {
    super(length, price, title);
    this.numberOfExercises = exerciseCount;
  }
}

class TheoreticalCourse extends Course {
  publish() {
    console.log("Publishing - ", this);
  }
}

const javaScriptCourse = new Course(43, 223, "Javascript Guide");
const reactCourse = new Course(23, 233, "React Guide");
const angularCourse = new Course(52, 132, "Angular Guide");
const nextJsCourse = new Course(40, 120, "NextJs Guide");

const courseItem = new CourseItems();
courseItem.courseItems = [angularCourse, nextJsCourse];
courseItem.courseItem = javaScriptCourse;
courseItem.courseItem = reactCourse;

console.log(courseItem.courseItems);
console.log(javaScriptCourse, reactCourse);

courseItem.courseItems.forEach((courseItem) => {
  courseItem.printCourseLogs();
  console.log(courseItem.calulatePrice());
});

const assignmentThirdPartOne = new PracticalCourse("Java Guide", 120, 45, 20);
assignmentThirdPartOne.printCourseLogs();

const assignmentThirdPartTwo = new TheoreticalCourse(12, 120, "C Sharp Guide");
assignmentThirdPartTwo.publish();
assignmentThirdPartTwo.printCourseLogs();

new Course(120, -12, "Assignment- Fourth Part - Entering Negative Value");

const assignmentFifthPart = new Course(
  23,
  120,
  "Assignment - Fifth Part - Accessing Private Property"
);
assignmentFifthPart.price = 1;
