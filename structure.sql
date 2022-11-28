use chodzeniethegra;

create table users(
    id int auto_increment primary key,
    username varchar(30) not null,
    password varchar(30) not null,
    best_score int
);