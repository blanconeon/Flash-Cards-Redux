In lessons, you often see both versions side by side for learning purposes, so it’s easy to think you’re comparing files from different branches directly.

But during a real merge conflict, Git only shows you the conflicting sections inside each file, marked with:

<<<<<<< HEAD
(content from current branch, usually master)
=======
(content from branch being merged in)
>>>>>>> edits

Copy code

You choose what to keep, and after you resolve and commit, only the resolved content remains in the file.
You never see the two files from different branches side by side in the editor—just the combined, marked-up version.

You’ve got it now! This is a common learning curve with Git.