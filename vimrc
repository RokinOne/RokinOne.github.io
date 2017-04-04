colors slate         " theme
syntax on            " automatic syntax

" set size of the window
set lines=60
set columns=80

set number           " line numbering
set cursorline       " highlight current line
set cursorcolumn     " highlight current column
set showmatch        " highlight matching bracket

set expandtab        " TAB is SPACE
set softtabstop=2    " lenght of TAB
set shiftwidth=2     " lenght of indent

" change cursor crosshair to a lighter grey
hi cursorline guibg=Grey20
hi cursorcolumn guibg=Grey20

" no message when found existing swap file
set shortmess+=A
