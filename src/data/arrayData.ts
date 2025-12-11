import { CodeStep } from "@/components/algoviz/IntegratedCodeLab";

export const reverseArrayCode: CodeStep[] = [
  {
    code: "def reverse_array(arr):",
    explanation: "We define a function that takes an array as input. Our goal is to reverse it in-place (without creating a new array).",
    variables: {
      "arr": "[1, 2, 3, 4, 5]"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [],
      action: 'none',
      pointers: []
    }
  },
  {
    code: "    left = 0",
    explanation: "We create a 'left' pointer that starts at the very beginning of the array (index 0). Think of it like placing your left hand at the start of a line of cards.",
    variables: {
      "arr": "[1, 2, 3, 4, 5]",
      "left": "0"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [0],
      action: 'read',
      pointers: [{ label: "left", targetId: "0" }]
    }
  },
  {
    code: "    right = len(arr) - 1",
    explanation: "We create a 'right' pointer that starts at the very end of the array (index 4). Now your right hand is at the end of the line of cards.",
    variables: {
      "arr": "[1, 2, 3, 4, 5]",
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [0, 4],
      action: 'read',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "    while left < right:",
    explanation: "We start a loop that continues as long as the left pointer hasn't met or crossed the right pointer. When they meet in the middle, we're done!",
    variables: {
      "arr": "[1, 2, 3, 4, 5]",
      "left": "0",
      "right": "4",
      "condition": "0 < 4 ✓"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [0, 4],
      action: 'read',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        # Swap the elements",
    explanation: "This is a comment explaining that we're about to swap the elements at the left and right positions. We're going to swap the card at your left hand with the card at your right hand.",
    variables: {
      "arr": "[1, 2, 3, 4, 5]",
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        temp = arr[left]",
    explanation: "We save the value at the left position (1) into a temporary variable. It's like picking up the left card and holding it so we don't lose it during the swap.",
    variables: {
      "arr": "[1, 2, 3, 4, 5]",
      "left": "0",
      "right": "4",
      "temp": "1"
    },
    visualState: {
      items: [1, 2, 3, 4, 5],
      activeIndices: [0],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        arr[left] = arr[right]",
    explanation: "We copy the value from the right position (5) into the left position. The left card slot now holds what was on the right.",
    variables: {
      "arr": "[5, 2, 3, 4, 5]",
      "left": "0",
      "right": "4",
      "temp": "1"
    },
    visualState: {
      items: [5, 2, 3, 4, 5],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        arr[right] = temp",
    explanation: "We put the saved value (1) from temp into the right position. Now the swap is complete! The first swap is done: 1 and 5 have traded places.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "0",
      "right": "4",
      "temp": "1"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        # Move pointers inward",
    explanation: "This comment tells us we're about to move both pointers toward the center. We've finished with the outer elements, so now we move to the next pair.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [0, 4],
      action: 'none',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        left += 1",
    explanation: "We move the left pointer one step to the right (from index 0 to index 1). Your left hand slides one card inward.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "1",
      "right": "4"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [1],
      action: 'read',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        right -= 1",
    explanation: "We move the right pointer one step to the left (from index 4 to index 3). Your right hand slides one card inward. Now both hands are pointing at the next pair to swap.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "1",
      "right": "3"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [1, 3],
      action: 'read',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "    while left < right:",
    explanation: "We check the loop condition again. Left (1) is still less than right (3), so we continue with another swap iteration.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "1",
      "right": "3",
      "condition": "1 < 3 ✓"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [1, 3],
      action: 'read',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        temp = arr[left]",
    explanation: "We save the value at position 1 (which is 2) into temp. Picking up the second card to hold it safely.",
    variables: {
      "arr": "[5, 2, 3, 4, 1]",
      "left": "1",
      "right": "3",
      "temp": "2"
    },
    visualState: {
      items: [5, 2, 3, 4, 1],
      activeIndices: [1],
      action: 'add',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        arr[left] = arr[right]",
    explanation: "We copy the value from position 3 (which is 4) into position 1. The second slot now holds what was in the fourth slot.",
    variables: {
      "arr": "[5, 4, 3, 4, 1]",
      "left": "1",
      "right": "3",
      "temp": "2"
    },
    visualState: {
      items: [5, 4, 3, 4, 1],
      activeIndices: [1, 3],
      action: 'add',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        arr[right] = temp",
    explanation: "We put the saved value (2) into position 3. The second swap is complete! 2 and 4 have switched places.",
    variables: {
      "arr": "[5, 4, 3, 2, 1]",
      "left": "1",
      "right": "3",
      "temp": "2"
    },
    visualState: {
      items: [5, 4, 3, 2, 1],
      activeIndices: [1, 3],
      action: 'add',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        left += 1",
    explanation: "We move left pointer from 1 to 2. Getting closer to the middle!",
    variables: {
      "arr": "[5, 4, 3, 2, 1]",
      "left": "2",
      "right": "3"
    },
    visualState: {
      items: [5, 4, 3, 2, 1],
      activeIndices: [2],
      action: 'read',
      pointers: [
        { label: "left", targetId: "2" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        right -= 1",
    explanation: "We move right pointer from 3 to 2. Now both pointers are at index 2—they've met in the middle!",
    variables: {
      "arr": "[5, 4, 3, 2, 1]",
      "left": "2",
      "right": "2"
    },
    visualState: {
      items: [5, 4, 3, 2, 1],
      activeIndices: [2],
      action: 'read',
      pointers: [
        { label: "left", targetId: "2" },
        { label: "right", targetId: "2" }
      ]
    }
  },
  {
    code: "    while left < right:",
    explanation: "We check the condition one last time. Left (2) is NOT less than right (2)—they're equal! So the loop stops. The middle element doesn't need swapping with itself.",
    variables: {
      "arr": "[5, 4, 3, 2, 1]",
      "left": "2",
      "right": "2",
      "condition": "2 < 2 ✗ (loop ends)"
    },
    visualState: {
      items: [5, 4, 3, 2, 1],
      activeIndices: [],
      action: 'none',
      pointers: []
    }
  },
  {
    code: "    return arr",
    explanation: "We return the reversed array! The array [1, 2, 3, 4, 5] has been successfully reversed to [5, 4, 3, 2, 1] using the two-pointer technique.",
    variables: {
      "arr": "[5, 4, 3, 2, 1]",
      "result": "[5, 4, 3, 2, 1]"
    },
    visualState: {
      items: [5, 4, 3, 2, 1],
      activeIndices: [0, 1, 2, 3, 4],
      action: 'add',
      pointers: []
    }
  }
];
