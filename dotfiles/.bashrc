# ALIASES
alias sha1='git rev-parse HEAD'
alias search='grep -rin $PWD -e'
alias fileinfo='$HOME/documents/fileinfo'
alias ls='ls --color -AopX --time-style=long-iso --group-directories-first'
alias hddinfo='lsblk -o NAME,KNAME,FSTYPE,MOUNTPOINT,LABEL,UUID,PARTFLAGS,SIZE,OWNER,GROUP,STATE'

# GIT ALIASES
alias gs='git status'
alias ga='git add -uv'
alias gb='git branch'
alias gc='git commit'
alias gd='git diff'
alias gp='git pull -r'
alias gpd='git push origin HEAD:refs/drafts/master'
alias gpm='git push origin HEAD:refs/for/master'
alias gpa='cd /repo/erosrok/cpp/; git fetch && git checkout -B master origin/master && git submodule foreach git checkout -B master origin/master'
alias gca='git commit --amend --no-edit'
alias gss='git show --stat | grep commit'
alias ghard='git reset --hard origin/master'
alias gsoft='git reset --soft origin/master'

# PROMPT
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[$(tput bold)\]\[\033[38;5;4m\]\u\[$(tput sgr0)\]\[\033[38;5;5m\]@\h\[$(tput sgr0)\]\[$(tput sgr0)\]\[\033[38;5;15m\] \[$(tput sgr0)\]\[\033[38;5;7m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\]\[$(tput sgr0)\]\$(parse_git_branch)\[\033[00m\] > "

# PS1 without git branch
# export PS1="\[$(tput bold)\]\[\033[38;5;4m\]\u\[$(tput sgr0)\]\[\033[38;5;5m\]@\h\[$(tput sgr0)\]\[$(tput sgr0)\]\[\033[38;5;15m\] \[$(tput sgr0)\]\[\033[38;5;7m\]\w\[$(tput sgr0)\]\[\033[38;5;15m\] > \[$(tput sgr0)\]"

# colorize ls output
LS_COLORS=$LS_COLORS:'di=1;37:ln=0;33:ex=0;32:so=0;37:ow=1;37:': ; export LS_COLORS

export PYTHON_EGG_CACHE=/home/$USER/.cache/python-eggs
