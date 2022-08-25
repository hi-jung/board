import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TB_KEYWORD", { schema: "service" })
export class TbKeyword {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "TK_ID",
    comment: "키워드 아이디",
    unsigned: true,
  })
  tkId: string;

  @Column("varchar", { name: "TK_USERNAME", comment: "작성자", length: 20 })
  tkUsername: string;

  @Column("varchar", { name: "TK_KEYWORD", comment: "키워드", length: 50 })
  tkKeyword: string;
}
