# #!/bin/sh
# #
# # An example hook script to verify what is about to be committed.
# # Called by "git commit" with no arguments.  The hook should
# # exit with non-zero status after issuing an appropriate message if
# # it wants to stop the commit.
# #
# # To enable this hook, rename this file to "pre-commit".
#
# ASPELL=$(which aspell)
# if [ $? -ne 0 ]; then
#     echo "Aspell not installed - unable to check spelling" >&2
#     exit
# else
#     WORDS=$($ASPELL list < "$1")
# fi
# if [ -n "$WORDS" ]; then
#     echo -e "\e[1;33m\tPossible spelling errors found in commit message. Use git commit --amend to change the message.\n\tPossible mispelled words: " $WORDS ".\e[0m" >&2
# fi
