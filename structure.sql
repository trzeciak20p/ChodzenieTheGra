use ChodzenieTheGame
create table Users{
    id int auto_increment not null,
    username varchar(30) not null,
    password varchar(30) not null,
    best_score int
};