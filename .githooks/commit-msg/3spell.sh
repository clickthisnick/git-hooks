#!/bin/sh
ASPELL=$(which aspell)
if [ $? -ne 0 ]; then
    echo "Aspell not installed - unable to check spelling" >&2
    exit
else
    # Words found that are thought to be mistakes
    SPELLING_MISTAKES=$($ASPELL --mode=email --add-email-quote='#' list < "$1" | sort -u)

    # Words that we don't want to alert user are mistakes
    IGNORE_MISTAKES=(Bugfix bugfix)

    #
    for i in "${IGNORE_MISTAKES[@]}"; do
        SPELLING_MISTAKES=(${SPELLING_MISTAKES[@]//*$i*})
    done

    echo ${SPELLING_MISTAKES}
fi
if [ -n "$SPELLING_MISTAKES" ]; then
    printf "\e[1;33m  Possible spelling errors found in commit message:\n\e[0m\e[0;31m%s\n\e[0m\e[1;33m  Use git commit --amend to change the message.\e[0m\n\n" "$SPELLING_MISTAKES" >&2
fi
