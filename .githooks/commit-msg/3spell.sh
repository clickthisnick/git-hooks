#!/bin/sh
ASPELL=$(which aspell)
if [ $? -ne 0 ]; then
    echo "Aspell not installed - unable to check spelling" >&2
    exit
else
    # Words found that are thought to be mistakes
    misspelled_words=$($ASPELL --mode=email --add-email-quote='#' list < "$1" | sort -u)
    echo ${misspelled_words}

    # Words that we don't want to alert user are mistakes
    ignored_words=(Bugfix bugfix)

    # Filtering out the ignored mistakes
    for i in "${ignored_words[@]}"; do
        misspelled_words=(${misspelled_words[@]//*$i*})
    done

    echo ${misspelled_words}
fi
if [ -n "$misspelled_words" ]; then
    printf "\e[1;33m  Possible spelling errors found in commit message:\n\e[0m\e[0;31m%s\n\e[0m\e[1;33m  Use git commit --amend to change the message.\e[0m\n\n" "$misspelled_words" >&2
fi
