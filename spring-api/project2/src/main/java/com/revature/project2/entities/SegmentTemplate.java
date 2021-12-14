package com.revature.project2.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "segment_template")
public class SegmentTemplate {
    @Id
    @SequenceGenerator(
            name = "segment_template_sequence",
            sequenceName = "segment_template_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "segment_template_sequence"
    )
    @Column(
            name = "segment_template_id",
            nullable = false
    )
    private Long segmentId;

    @Column(name = "segment_name")
    private String segmentName;

    @ManyToOne
    @JoinColumn(name = "session_template_id")
    private SessionTemplate sessionTemplate;

    @Column(name = "segment_length")
    private int segmentLength;

    @Column(name = "segment_position")
    private int segmentPosition;

    @Column(name = "is_break")
    private boolean isBreak;
}
