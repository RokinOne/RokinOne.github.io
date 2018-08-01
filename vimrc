" RRR Vim configuration
" Updated 2018-08-01

" move .viminfo to .vim folder
set viminfo+=n~/.vim/.viminfo

colors slate          " theme
syntax on             " automatic syntax
let mapleader = " "

" set size of the window
set columns=80
set lines=60

set number            " line numbering
set cursorline        " highlight current line
set cursorcolumn      " highlight current column
set showmatch         " highlight matching bracket
set colorcolumn=80    " highlight 80th column

set expandtab         " TAB is SPACE
set softtabstop=2     " lenght of TAB
set shiftwidth=2      " lenght of indent

set listchars=eol:$,tab:>-,trail:~,extends:>,precedes:<
set laststatus=2      " statusline always on
set backspace=indent,eol,start

" change cursor crosshair to a lighter grey
hi cursorline guibg=Grey20
hi cursorcolumn guibg=Grey20
" change 80th column to purple
hi colorcolumn ctermbg=5 guibg=#2c2d27

" no message when found existing swap file
set shortmess+=A
" place swap files in specific directory
set directory^=$HOME/.vim/tmp//

" controls
" save
nnoremap s :update<CR>
nnoremap q :quit<CR>
" select all
xnoremap a gg<ESC>vVG
" copy, cut, paste
noremap <C-c> "*y
noremap <C-x> "*x
noremap <C-v> "*p
" toggle unprintable characters
nnoremap <F3> :set list!<CR>

set statusline=%t[%{strlen(&fenc)?&fenc:'none'},%{&ff}]%h%m%r%y%=%c,%l/%L\ %P

" highlight same occurences of a word on a double-click
set hlsearch
set mouse=a
nnoremap <silent> <2-LeftMouse> :let @/='\V\<'.escape(expand('<cword>'), '\').'\>'<cr>:set hls<cr> 

set showcmd " show current command

if has('gui_running')
  let &colorcolumn=join(range(81,9999),",") " change bg after 80th column
endif
