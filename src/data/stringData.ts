import { CodeStep } from "@/components/algoviz/IntegratedCodeLab";

export const isPalindromeCode: CodeStep[] = [
  {
    code: "def is_palindrome(text):",
    explanation: "We define a function that checks if a word reads the same forwards and backwards (like 'RADAR'). A palindrome is a mirror image of itself!",
    variables: {
      "text": '"RADAR"'
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [],
      action: 'none',
      pointers: []
    }
  },
  {
    code: "    left = 0",
    explanation: "We place our 'left' pointer at the very first character (index 0, which is 'R'). Like pointing your left finger at the start of the word.",
    variables: {
      "text": '"RADAR"',
      "left": "0"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0],
      action: 'read',
      pointers: [{ label: "left", targetId: "0" }]
    }
  },
  {
    code: "    right = len(text) - 1",
    explanation: "We place our 'right' pointer at the very last character (index 4, which is also 'R'). Like pointing your right finger at the end of the word.",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We start a loop that keeps running as long as the left pointer hasn't crossed the right pointer. We'll compare characters pair by pair, moving inward.",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4",
      "condition": "0 < 4 ✓"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 4],
      action: 'read',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        # Compare characters at ends",
    explanation: "This comment tells us we're about to compare the character at the left pointer with the character at the right pointer. Do they match?",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 4],
      action: 'read',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        if text[left] != text[right]:",
    explanation: "We compare 'R' (at index 0) with 'R' (at index 4). They're the same! So this condition is False, and we skip the return statement inside the if block.",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4",
      "comparison": "'R' == 'R' ✓"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "            return False",
    explanation: "(Skipped) If the characters didn't match, we would immediately return False—the word can't be a palindrome if any pair doesn't match. But they matched, so we continue!",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4",
      "status": "Characters match, continue..."
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        # If match, move closer",
    explanation: "This comment explains we're about to move both pointers toward the center since the outer pair matched. We'll check the next inner pair.",
    variables: {
      "text": '"RADAR"',
      "left": "0",
      "right": "4"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 4],
      action: 'add',
      pointers: [
        { label: "left", targetId: "0" },
        { label: "right", targetId: "4" }
      ]
    }
  },
  {
    code: "        left += 1",
    explanation: "We move the left pointer one step to the right (from 0 to 1). Now it's pointing at 'A'.",
    variables: {
      "text": '"RADAR"',
      "left": "1",
      "right": "4"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We move the right pointer one step to the left (from 4 to 3). Now it's pointing at 'A'. Both pointers are ready to compare the next pair!",
    variables: {
      "text": '"RADAR"',
      "left": "1",
      "right": "3"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We check the loop condition again. Left (1) is still less than right (3), so we continue to the next comparison.",
    variables: {
      "text": '"RADAR"',
      "left": "1",
      "right": "3",
      "condition": "1 < 3 ✓"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [1, 3],
      action: 'read',
      pointers: [
        { label: "left", targetId: "1" },
        { label: "right", targetId: "3" }
      ]
    }
  },
  {
    code: "        if text[left] != text[right]:",
    explanation: "We compare 'A' (at index 1) with 'A' (at index 3). They match again! The condition is False, so we skip returning False.",
    variables: {
      "text": '"RADAR"',
      "left": "1",
      "right": "3",
      "comparison": "'A' == 'A' ✓"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We move left from 1 to 2. Now it's pointing at 'D' in the middle.",
    variables: {
      "text": '"RADAR"',
      "left": "2",
      "right": "3"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We move right from 3 to 2. Now both pointers are at index 2—they've met in the middle at 'D'!",
    variables: {
      "text": '"RADAR"',
      "left": "2",
      "right": "2"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
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
    explanation: "We check the condition one last time. Left (2) is NOT less than right (2)—they're equal! The loop ends. All pairs matched successfully.",
    variables: {
      "text": '"RADAR"',
      "left": "2",
      "right": "2",
      "condition": "2 < 2 ✗ (loop ends)"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [],
      action: 'none',
      pointers: []
    }
  },
  {
    code: "    return True",
    explanation: "We made it through the entire loop without finding any mismatched pairs! This means 'RADAR' is indeed a palindrome. It reads the same forwards and backwards!",
    variables: {
      "text": '"RADAR"',
      "result": "True ✓ (PALINDROME!)"
    },
    visualState: {
      items: ['R', 'A', 'D', 'A', 'R'],
      activeIndices: [0, 1, 2, 3, 4],
      action: 'add',
      pointers: []
    }
  }
];
